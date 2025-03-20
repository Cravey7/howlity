import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Feature, FeatureStatus, FeaturePriority, FeatureComplexity } from '@/types/database';
import { ApiError, ApiErrorType } from '@/types/api';

export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get('applicationId');
    const status = searchParams.get('status');

    let query = supabase.from('features').select('*');

    if (applicationId) {
      query = query.eq('application_id', applicationId);
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data: features, error } = await query.order('created_at', { ascending: false });

    if (error) {
      throw error;

      return NextResponse.json(features);
    }
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to fetch features',
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

    // Create feature with default values
    const feature: Partial<Feature> = {
      name: body.name,
      description: body.description || '',
      applicationId: body.applicationId,
      status: body.status || FeatureStatus.Planned,
      priority: body.priority || FeaturePriority.Medium,
      complexity: body.complexity || FeatureComplexity.Medium,
      estimatedHours: body.estimatedHours || 0,
      actualHours: body.actualHours || 0,
      tags: body.tags || [],
      metadata: body.metadata || {},
      requirements: body.requirements || [],
      acceptanceCriteria: body.acceptanceCriteria || [],
      dependencies: body.dependencies || [],
      assignedTo: body.assignedTo,
      dueDate: body.dueDate,
      completedAt: body.completedAt,
    };

    const { data, error } = await supabase.from('features').insert(feature).select().single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to create feature',
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
      .from('features')
      .update({
        name: body.name,
        description: body.description,
        status: body.status,
        priority: body.priority,
        complexity: body.complexity,
        estimatedHours: body.estimatedHours,
        actualHours: body.actualHours,
        tags: body.tags,
        metadata: body.metadata,
        requirements: body.requirements,
        acceptanceCriteria: body.acceptanceCriteria,
        dependencies: body.dependencies,
        assignedTo: body.assignedTo,
        dueDate: body.dueDate,
        completedAt: body.completedAt,
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
      name: 'Failed to update feature',
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

    const { error } = await supabase.from('features').delete().eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    const apiError: ApiError = {
      name: 'Failed to delete feature',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      type: ApiErrorType.Server,
    };
    return NextResponse.json(apiError, { status: 500 });
  }
}
