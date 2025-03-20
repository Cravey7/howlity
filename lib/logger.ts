type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: string;
  source: 'client' | 'server';
  userId?: string;
  sessionId?: string;
}

class Logger {
  private static instance: Logger;
  private isServer: boolean;
  private logLevel: LogLevel;

  private constructor() {
    this.isServer = typeof window === 'undefined';
    this.logLevel = (process.env.LOG_LEVEL as LogLevel) || 'info';
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: Record<LogLevel, number> = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3,
    };
    return levels[level] <= levels[this.logLevel];
  }

  private async log(level: LogLevel, message: string, data?: any) {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
      source: this.isServer ? 'server' : 'client',
    };

    // In development, log to console with colors
    if (process.env.NODE_ENV === 'development') {
      const colors = {
        error: '\x1b[31m', // Red
        warn: '\x1b[33m', // Yellow
        info: '\x1b[36m', // Cyan
        debug: '\x1b[35m', // Magenta
        reset: '\x1b[0m', // Reset
      };
      console.log(`${colors[level]}[${level.toUpperCase()}]${colors.reset} ${message}`, data || '');
    }

    // In production, send to API
    if (process.env.NODE_ENV === 'production') {
      try {
        const response = await fetch('/api/logs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(entry),
        });

        if (!response.ok) {
          console.error('Failed to send log:', await response.text());
        }
      } catch (error) {
        console.error('Failed to send log:', error);
      }
    }
  }

  public info(message: string, data?: any) {
    this.log('info', message, data);
  }

  public warn(message: string, data?: any) {
    this.log('warn', message, data);
  }

  public error(message: string, data?: any) {
    this.log('error', message, data);
  }

  public debug(message: string, data?: any) {
    if (process.env.NODE_ENV === 'development') {
      this.log('debug', message, data);
    }
  }
}

export const serverLogger = Logger.getInstance();
export const clientLogger = Logger.getInstance();
