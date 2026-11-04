
export type EventType =
  | "Cleanup"
  | "Plantation"
  | "Donation"
  | "Education"
  | "Food Distribution"
  | "Health Camp";

export interface EventParticipant {
  userId?: string;
  name: string;
  email: string;
  joinedAt: string;
}

export interface EventSchedule {
  time: string;
  activity: string;
}

export interface Event {
  _id?: string;

  title: string;
  description: string;
  eventType: EventType;

  thumbnail: string;
  location: string;
  eventDate: string;

  duration: string;
  capacity: number;

  requirements: string[];
  whatToBring: string[];
  benefits: string[];

  schedule: EventSchedule[];

  creator: {
    name: string;
    email: string;
  };

  participants: EventParticipant[];

  createdAt: string;
  updatedAt: string;
}
