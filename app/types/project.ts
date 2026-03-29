export interface CarouselProject {
    id: string;
    name: string;
    lastUpdated: number;
    thumbnail?: string; // Preview do primeiro slide
    data: {
      slides: any[];
      brandKit: any;
      transitions: any[];
    };
  }