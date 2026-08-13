export type MembershipTier = "free" | "elite";

export type MembershipStatus = "inactive" | "active" | "past_due" | "canceled";

export type CourseStatus = "draft" | "published";

export type EnrollmentStatus = "not_started" | "in_progress" | "completed";

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  membership_tier: MembershipTier;
  membership_status: MembershipStatus;
  stripe_customer_id: string | null;
};

export type Course = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  status: CourseStatus;
  estimated_hours: number | null;
};

export type Certificate = {
  id: string;
  course_id: string;
  code: string;
  issued_at: string;
};
