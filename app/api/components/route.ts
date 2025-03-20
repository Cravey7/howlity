import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Component, ComponentType } from '@/types/database';
import { ApiError, ApiErrorType } from '@/types/api';

export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('pageId');
    const type = searchParams.get('type');

    let query = supabase.from('components').select('*');

    if (pageId) {
      query = query.eq('page_id', pageId);
    }

    if (type) {
      query = query.eq('type', type);
    }

    const { data: components, error } = await query.order('created_at', { ascending: false });

    if (error) {
      throw error;

      return NextResponse.json(components);
    }
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to fetch components',
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
    if (!body.name || !body.pageId) {
      const apiError: ApiError = {
        name: 'Validation Error',
        message: 'Name and pageId are required',
        type: ApiErrorType.Validation,
      };
      return NextResponse.json(apiError, { status: 400 });
    }

    // Create component with default values
    const component: Partial<Component> = {
      name: body.name,
      description: body.description || '',
      pageId: body.pageId,
      type: body.type || ComponentType.UI,
      content: body.content || '',
      tags: body.tags || [],
      metadata: body.metadata || {},
      settings: body.settings || {},
      styles: body.styles || {},
      scripts: body.scripts || [],
      dependencies: body.dependencies || [],
      props: body.props || {},
      events: body.events || [],
      slots: body.slots || [],
    };

    const { data, error } = await supabase.from('components').insert(component).select().single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to create component',
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
      .from('components')
      .update({
        name: body.name,
        description: body.description,
        type: body.type,
        content: body.content,
        tags: body.tags,
        metadata: body.metadata,
        settings: body.settings,
        styles: body.styles,
        scripts: body.scripts,
        dependencies: body.dependencies,
        props: body.props,
        events: body.events,
        slots: body.slots,
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
      name: 'Failed to update component',
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

    const { error } = await supabase.from('components').delete().eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to delete component',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      type: ApiErrorType.Server,
    };
    return NextResponse.json(apiError, { status: 500 });
  }
}
