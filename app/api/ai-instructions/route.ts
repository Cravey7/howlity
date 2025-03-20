import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { AIInstruction, AIInstructionType } from '@/types/database';
import { ApiError, ApiErrorType } from '@/types/api';

export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get('applicationId');
    const type = searchParams.get('type');

    let query = supabase.from('ai_instructions').select('*');

    if (applicationId) {
      query = query.eq('application_id', applicationId);
    }

    if (type) {
      query = query.eq('type', type);
    }

    const { data: instructions, error } = await query.order('created_at', { ascending: false });

    if (error) {
      throw error;

      return NextResponse.json(instructions);
    }
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to fetch AI instructions',
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

    // Create AI instruction with default values
    const instruction: Partial<AIInstruction> = {
      name: body.name,
      description: body.description || '',
      applicationId: body.applicationId,
      type: body.type || AIInstructionType.General,
      content: body.content || '',
      tags: body.tags || [],
      metadata: body.metadata || {},
      settings: body.settings || {},
      examples: body.examples || [],
      variables: body.variables || [],
      context: body.context || {},
    };

    const { data, error } = await supabase
      .from('ai_instructions')
      .insert(instruction)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to create AI instruction',
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
      .from('ai_instructions')
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
      name: 'Failed to update AI instruction',
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

    const { error } = await supabase.from('ai_instructions').delete().eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to delete AI instruction',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      type: ApiErrorType.Server,
    };
    return NextResponse.json(apiError, { status: 500 });
  }
}
