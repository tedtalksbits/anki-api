/*
  Table: decks
  Columns:
    id bigint AI PK 
    user_id bigint 
    name varchar(255) 
    description varchar(255) 
    tags varchar(255) 
    image varchar(255) 
    visibility varchar(255) 
    created_at datetime 
    updated_at datetime
*/

export type DeckType = {
  readonly id: number;
  readonly user_id: number;
  name: string;
  description: string;
  tags: string;
  image: string;
  visibility: string;
  readonly created_at: Date;
  readonly updated_at: Date;
};

export type DeckDTOType = {
  name: string;
  user_id: number;
  description: string | null;
  tags: string | null;
  image: string | null;
  visibility: string | null;
};
