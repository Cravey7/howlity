import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Tool, ToolType } from '@/types/database';
import { ApiError, ApiErrorType } from '@/types/api';

export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { searchParams } = new URL(request.url);
    const stackId = searchParams.get('stackId');
    const type = searchParams.get('type');

    let query = supabase.from('tools').select('*');

    if (stackId) {
      query = query.eq('stack_id', stackId);
    }

    if (type) {
      query = query.eq('type', type);
    }

    const { data: tools, error } = await query.order('created_at', { ascending: false });

    if (error) {
      throw error;

      return NextResponse.json(tools);
    }
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to fetch tools',
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
    if (!body.name || !body.stackId) {
      const apiError: ApiError = {
        name: 'Validation Error',
        message: 'Name and stackId are required',
        type: ApiErrorType.Validation,
      };
      return NextResponse.json(apiError, { status: 400 });
    }

    // Create tool with default values
    const tool: Partial<Tool> = {
      name: body.name,
      description: body.description || '',
      stackId: body.stackId,
      type: body.type || ToolType.Framework,
      version: body.version || 'latest',
      tags: body.tags || [],
      metadata: body.metadata || {},
      settings: body.settings || {},
      dependencies: body.dependencies || [],
      documentation: body.documentation || '',
      examples: body.examples || [],
    };

    const { data, error } = await supabase.from('tools').insert(tool).select().single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to create tool',
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
      .from('tools')
      .update({
        name: body.name,
        description: body.description,
        type: body.type,
        version: body.version,
        tags: body.tags,
        metadata: body.metadata,
        settings: body.settings,
        dependencies: body.dependencies,
        documentation: body.documentation,
        examples: body.examples,
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
      name: 'Failed to update tool',
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

    const { error } = await supabase.from('tools').delete().eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to delete tool',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      type: ApiErrorType.Server,
    };
    return NextResponse.json(apiError, { status: 500 });
  }
}
