import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { AIPrompt, AIPromptType } from '@/types/database';
import { ApiError, ApiErrorType } from '@/types/api';

export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get('applicationId');
    const type = searchParams.get('type');

    let query = supabase.from('ai_prompts').select('*');

    if (applicationId) {
      query = query.eq('application_id', applicationId);
    }

    if (type) {
      query = query.eq('type', type);
    }

    const { data: prompts, error } = await query.order('created_at', { ascending: false });

    if (error) {
      throw error;

      return NextResponse.json(prompts);
    }
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to fetch AI prompts',
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

    // Create AI prompt with default values
    const prompt: Partial<AIPrompt> = {
      name: body.name,
      description: body.description || '',
      applicationId: body.applicationId,
      type: body.type || AIPromptType.General,
      content: body.content || '',
      tags: body.tags || [],
      metadata: body.metadata || {},
      settings: body.settings || {},
      examples: body.examples || [],
      variables: body.variables || [],
      context: body.context || {},
    };

    const { data, error } = await supabase.from('ai_prompts').insert(prompt).select().single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to create AI prompt',
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
      .from('ai_prompts')
      .update({
        name: body.name,
        description: body.description,
        type: body.type,
        content: body.content,
        tags: body.tags,
        metadata: body.metadata,
        settings: body.settings,
        examples: body.examples,
        variables: body.variables,
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
      name: 'Failed to update AI prompt',
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

    const { error } = await supabase.from('ai_prompts').delete().eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to delete AI prompt',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      type: ApiErrorType.Server,
    };
    return NextResponse.json(apiError, { status: 500 });
  }
}
