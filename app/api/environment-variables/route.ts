import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import {
  EnvironmentVariable,
  EnvironmentVariableType,
  EnvironmentVariableScope,
} from '@/types/database';
import { ApiError, ApiErrorType } from '@/types/api';

export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get('applicationId');
    const scope = searchParams.get('scope');

    let query = supabase.from('environment_variables').select('*');

    if (applicationId) {
      query = query.eq('application_id', applicationId);
    }

    if (scope) {
      query = query.eq('scope', scope);
    }

    const { data: variables, error } = await query.order('created_at', { ascending: false });

    if (error) {
      throw error;

      return NextResponse.json(variables);
    }
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to fetch environment variables',
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

    // Create environment variable with default values
    const variable: Partial<EnvironmentVariable> = {
      name: body.name,
      description: body.description || '',
      applicationId: body.applicationId,
      type: body.type || EnvironmentVariableType.String,
      scope: body.scope || EnvironmentVariableScope.Development,
      value: body.value || '',
      isSecret: body.isSecret || false,
      tags: body.tags || [],
      metadata: body.metadata || {},
    };

    const { data, error } = await supabase
      .from('environment_variables')
      .insert(variable)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to create environment variable',
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
      .from('environment_variables')
      .update({
        name: body.name,
        description: body.description,
        type: body.type,
        scope: body.scope,
        value: body.value,
        isSecret: body.isSecret,
        tags: body.tags,
        metadata: body.metadata,
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
      name: 'Failed to update environment variable',
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

    const { error } = await supabase.from('environment_variables').delete().eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to delete environment variable',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      type: ApiErrorType.Server,
    };
    return NextResponse.json(apiError, { status: 500 });
  }
}
