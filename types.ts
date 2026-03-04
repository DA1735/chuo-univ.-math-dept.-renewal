
export interface Staff {
  id: number;
  role: 'faculty' | 'staff';
  name_ja: string;
  name_en: string | null;
  position: string;
  fields: string[];
  email: string | null;
  photo: string | null;
  personal_page: string | null;
  lab_page: string | null;
  notes: string | null;
}

export interface Talk {
  time_start: string;
  time_end: string;
  title: string;
  speaker: string;
  affiliation?: string;
}

export interface ScheduleDay {
  date: string;
  date_display: string;
  talks: Talk[];
}

export interface LectureMaterial {
  title: string;
  speaker: string;
  filename: string;
  url: string;
}

export interface EncounterEvent {
  number: number;
  title: string;
  date_start: string;
  date_end: string;
  venue: string;
  schedule: ScheduleDay[];
  resume_pdf?: string;
  lecture_materials?: LectureMaterial[];
  description?: string;
}

export interface NewsItem {
  id: string;
  date: string;
  category: 'Event' | 'Research' | 'Admission' | 'Other';
  title: string;
  link: string;
}

export interface UnifiedEvent {
  number: number;
  date: string;       // "YYYY年MM月DD日", "YYYY-MM-DD", "YYYY-MM-DD ~ YYYY-MM-DD" etc.
  title: string;
  speaker?: string;   // 複数名の場合は文字列結合 "A, B, C"
  affiliation?: string;
  time?: string;      // "16:30-18:00" etc
  place?: string;     // "後楽園キャンパス 6号館..." 
  abstract?: string;  // HTML/Markdown or plain text including programs
  note?: string;      // warnings, internal notes, etc.
  poster?: string;    // url to poster pdf
  documents?: { title: string; url: string }[];
  link?: string;      // url to external site or internal route
  badge?: string;     // "番外編", "Workshop", "最終講義" etc.
}
