export interface Module {
    module_id: number | null;
    course_id: number | null;
    title: string;
    purpose: string;
    description: string;
    url: string;
    moduleNumber: number;
    teacher: string;
    created_by: string;
    created_at: string;
    updated_by: string;
    updated_at: string;
    deleted: boolean;
}