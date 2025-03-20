import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { AIAgent, AIAgentType, AIAgentStatus } from '@/types/database';
import { ApiError, ApiErrorType } from '@/types/api';

export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get('applicationId');
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    let query = supabase.from('ai_agents').select('*');

    if (applicationId) {
      query = query.eq('application_id', applicationId);
    }

    if (type) {
      query = query.eq('type', type);
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data: agents, error } = await query.order('created_at', { ascending: false });

    if (error) {
      throw error;

      return NextResponse.json(agents);
    }
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to fetch AI agents',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      type: ApiErrorType.Server,
    };
    return NextResponse.json(apiError, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.applicationId) {
      const apiError: ApiError = {
        name: 'Validation Error',
        message: 'Name and applicationId are required',
        type: ApiErrorType.Validation,
      };
      return NextResponse.json(apiError, { status: 400 });
    }

    // Create AI agent with default values
    const agent: Partial<AIAgent> = {
      name: body.name,
      description: body.description || '',
      applicationId: body.applicationId,
      type: body.type || AIAgentType.Assistant,
      status: body.status || AIAgentStatus.Inactive,
      version: '1.0.0',
      tags: body.tags || [],
      metadata: body.metadata || {},
      settings: body.settings || {},
      capabilities: body.capabilities || [],
      limitations: body.limitations || [],
      prompts: body.prompts || [],
      instructions: body.instructions || [],
      context: body.context || {},
    };

    const { data, error } = await supabase.from('ai_agents').insert(agent).select().single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to create AI agent',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      type: ApiErrorType.Server,
    };
    return NextResponse.json(apiError, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const body = await request.json();

    if (!body.id) {
      const apiError: ApiError = {
        name: 'Validation Error',
        message: 'ID is required',
        type: ApiErrorType.Validation,
      };
      return NextResponse.json(apiError, { status: 400 });
    }

    const { data, error } = await supabase
      .from('ai_agents')
      .update({
        name: body.name,
        description: body.description,
        type: body.type,
        status: body.status,
        version: body.version,
        tags: body.tags,
        metadata: body.metadata,
        settings: body.settings,
        capabilities: body.capabilities,
        limitations: body.limitations,
        prompts: body.prompts,
        instructions: body.instructions,
        context: body.context,
        updated_at: new Date().toISOString(),
      })
      .eq('id', body.id)
      .select()
      .single();

    if (error) {
      throw error;

      return NextResponse.json(data);
    }
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to update AI agent',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      type: ApiErrorType.Server,
    };
    return NextResponse.json(apiError, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      const apiError: ApiError = {
        name: 'Validation Error',
        message: 'ID is required',
        type: ApiErrorType.Validation,
      };
      return NextResponse.json(apiError, { status: 400 });
    }

    const { error } = await supabase.from('ai_agents').delete().eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to delete AI agent',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      type: ApiErrorType.Server,
    };
    return NextResponse.json(apiError, { status: 500 });
  }
}
