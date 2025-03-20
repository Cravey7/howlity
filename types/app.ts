import { Database } from './database';

/**
 * Application-specific type definitions
 */

/**
 * Represents a system in the application
 */
export type System = Database['System'];

/**
 * Represents an application in the system
 */
export type Application = Database['Application'];

/**
 * Represents a feature in an application
 */
export type Feature = Database['Feature'];

/**
 * Represents a stack in the system
 */
export type Stack = Database['Stack'];

/**
 * Represents a tool in a stack
 */
export type Tool = Database['Tool'];

/**
 * Represents an environment variable
 */
export type EnvironmentVariable = Database['EnvironmentVariable'];

/**
 * Represents an AI prompt
 */
export type AIPrompt = Database['AIPrompt'];

/**
 * Represents an AI instruction
 */
export type AIInstruction = Database['AIInstruction'];

/**
 * Represents AI usage cost
 */
export type AIUsageCost = Database['AIUsageCost'];

/**
 * Represents an AI model
 */
export type AIModel = Database['AIModel'];

/**
 * Represents an AI agent
 */
export type AIAgent = Database['AIAgent'];

/**
 * Represents a page in an application
 */
export type Page = Database['Page'];

/**
 * Represents a component in a page
 */
export type Component = Database['Component'];

/**
 * Represents navigation in an application
 */
export type Navigation = Database['Navigation'];

/**
 * Represents a database table
 */
export type DatabaseTable = Database['DatabaseTable'];

/**
 * Represents a database field
 */
export type DatabaseField = Database['DatabaseField'];

/**
 * Represents a database relationship
 */
export type DatabaseRelationship = Database['DatabaseRelationship'];

/**
 * Represents a database role
 */
export type DatabaseRole = Database['DatabaseRole'];

/**
 * Represents a database permission
 */
export type DatabasePermission = Database['DatabasePermission'];

/**
 * Represents a unit test
 */
export type UnitTest = Database['UnitTest'];

/**
 * Represents an API test
 */
export type APITest = Database['APITest'];

/**
 * Represents an E2E test
 */
export type E2ETest = Database['E2ETest'];

/**
 * Represents application status
 */
export enum ApplicationStatus {
  DRAFT = 'draft',
  IN_PROGRESS = 'in_progress',
  REVIEW = 'review',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
}

/**
 * Represents feature priority
 */
export enum FeaturePriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

/**
 * Represents test status
 */
export enum TestStatus {
  PENDING = 'pending',
  PASSED = 'passed',
  FAILED = 'failed',
  SKIPPED = 'skipped',
}

/**
 * Represents AI model provider
 */
export enum AIModelProvider {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  GOOGLE = 'google',
  CUSTOM = 'custom',
}

/**
 * Represents database field type
 */
export enum DatabaseFieldType {
  TEXT = 'text',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  DATE = 'date',
  DATETIME = 'datetime',
  JSON = 'json',
  UUID = 'uuid',
  EMAIL = 'email',
  PASSWORD = 'password',
  URL = 'url',
  FILE = 'file',
  IMAGE = 'image',
  ENUM = 'enum',
  RELATION = 'relation',
}

/**
 * Represents database relationship type
 */
export enum DatabaseRelationshipType {
  ONE_TO_ONE = 'one_to_one',
  ONE_TO_MANY = 'one_to_many',
  MANY_TO_ONE = 'many_to_one',
  MANY_TO_MANY = 'many_to_many',
}

/**
 * Represents application creation data
 */
export type CreateApplicationData = Omit<Application, 'id' | 'created_at' | 'updated_at'>;

/**
 * Represents application update data
 */
export type UpdateApplicationData = Partial<CreateApplicationData>;

/**
 * Represents feature creation data
 */
export type CreateFeatureData = Omit<Feature, 'id' | 'created_at' | 'updated_at'>;

/**
 * Represents feature update data
 */
export type UpdateFeatureData = Partial<CreateFeatureData>;

/**
 * Represents test creation data
 */
export type CreateTestData = Omit<UnitTest | APITest | E2ETest, 'id' | 'created_at' | 'updated_at'>;

/**
 * Represents test update data
 */
export type UpdateTestData = Partial<CreateTestData>;
