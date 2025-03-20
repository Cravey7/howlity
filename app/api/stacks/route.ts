import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Stack, StackType } from '@/types/database';
import { ApiError, ApiErrorType } from '@/types/api';

export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { searchParams } = new URL(request.url);
    const systemId = searchParams.get('systemId');
    const type = searchParams.get('type');

    let query = supabase.from('stacks').select('*');

    if (systemId) {
      query = query.eq('system_id', systemId);
    }

    if (type) {
      query = query.eq('type', type);
    }

    const { data: stacks, error } = await query.order('created_at', { ascending: false });

    if (error) {
      throw error;

      return NextResponse.json(stacks);
    }
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to fetch stacks',
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
    if (!body.name || !body.systemId) {
      const apiError: ApiError = {
        name: 'Validation Error',
        message: 'Name and systemId are required',
        type: ApiErrorType.Validation,
      };
      return NextResponse.json(apiError, { status: 400 });
    }

    // Create stack with default values
    const stack: Partial<Stack> = {
      name: body.name,
      description: body.description || '',
      systemId: body.systemId,
      type: body.type || StackType.Frontend,
      version: '1.0.0',
      tags: body.tags || [],
      metadata: body.metadata || {},
      settings: body.settings || {},
      tools: body.tools || [],
      dependencies: body.dependencies || [],
    };

    const { data, error } = await supabase.from('stacks').insert(stack).select().single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to create stack',
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
      .from('stacks')
      .update({
        name: body.name,
        description: body.description,
        type: body.type,
        version: body.version,
        tags: body.tags,
        metadata: body.metadata,
        settings: body.settings,
        tools: body.tools,
        dependencies: body.dependencies,
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
      name: 'Failed to update stack',
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

    const { error } = await supabase.from('stacks').delete().eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to delete stack',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      type: ApiErrorType.Server,
    };
    return NextResponse.json(apiError, { status: 500 });
  }
}
