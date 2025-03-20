import { NextResponse } from 'next/server';
import {
  queryTable,
  getById,
  createRecord,
  updateRecord,
  deleteRecord,
} from '@/lib/supabase/server/queries';
import type { Application } from '@/types/database';
import { ApiError, ApiErrorType } from '@/types/api';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const systemId = searchParams.get('systemId');
    const id = searchParams.get('id');

    if (id) {
      const { data, error } = await getById('applications', id);
      if (error) throw error;
      return NextResponse.json(data);
    }

    const options = systemId ? {
      filters: [{
        column: 'system_id',
        operator: 'eq',
        value: systemId,
      }],
    } : undefined;

    const { data, error } = await queryTable('applications', {
      ...options,
      orderBy: {
        column: 'created_at',
        ascending: false,
      },
    });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to fetch applications',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      type: ApiErrorType.Server,
    };
    return NextResponse.json(apiError, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
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

    // Create application with default values
    const application: Partial<Application> = {
      name: body.name,
      description: body.description || '',
      systemId: body.systemId,
      type: body.type || 'web',
      environment: body.environment || 'development',
      status: 'active',
      version: '1.0.0',
      tags: body.tags || [],
      metadata: body.metadata || {},
      settings: body.settings || {},
      config: body.config || {},
      dependencies: body.dependencies || [],
      features: body.features || [],
    };

    const { data, error } = await createRecord('applications', application);

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to create application',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      type: ApiErrorType.Server,
    };
    return NextResponse.json(apiError, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    if (!body.id) {
      const apiError: ApiError = {
        name: 'Validation Error',
        message: 'ID is required',
        type: ApiErrorType.Validation,
      };
      return NextResponse.json(apiError, { status: 400 });
    }

    const { data, error } = await updateRecord('applications', body.id, {
      name: body.name,
      description: body.description,
      type: body.type,
      environment: body.environment,
      status: body.status,
      version: body.version,
      tags: body.tags,
      metadata: body.metadata,
      settings: body.settings,
      config: body.config,
      dependencies: body.dependencies,
      features: body.features,
      updated_at: new Date().toISOString(),
    });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to update application',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      type: ApiErrorType.Server,
    };
    return NextResponse.json(apiError, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
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

    const { data, error } = await deleteRecord('applications', id);

    if (error) throw error;
    return NextResponse.json({ success: data });
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to delete application',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      type: ApiErrorType.Server,
    };
    return NextResponse.json(apiError, { status: 500 });
  }
}
