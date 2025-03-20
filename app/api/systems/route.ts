import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { System, SystemStatus, SystemVisibility } from '@/types/database';
import { ApiError, ApiErrorType } from '@/types/api';

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: systems, error } = await supabase
      .from('systems')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;

      return NextResponse.json(systems);
    }
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to fetch systems',
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
    if (!body.name) {
      const apiError: ApiError = {
        name: 'Validation Error',
        message: 'Name is required',
        type: ApiErrorType.Validation,
      };
      return NextResponse.json(apiError, { status: 400 });
    }

    // Create system with default values
    const system: Partial<System> = {
      name: body.name,
      description: body.description || '',
      status: SystemStatus.Active,
      visibility: SystemVisibility.Private,
      tags: body.tags || [],
      metadata: body.metadata || {},
      version: '1.0.0',
      settings: body.settings || {},
      parentId: body.parentId,
    };

    const { data, error } = await supabase.from('systems').insert(system).select().single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to create system',
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
      .from('systems')
      .update({
        name: body.name,
        description: body.description,
        status: body.status,
        visibility: body.visibility,
        tags: body.tags,
        metadata: body.metadata,
        version: body.version,
        settings: body.settings,
        parentId: body.parentId,
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
      name: 'Failed to update system',
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

    const { error } = await supabase.from('systems').delete().eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to delete system',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      type: ApiErrorType.Server,
    };
    return NextResponse.json(apiError, { status: 500 });
  }
}
