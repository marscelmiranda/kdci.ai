-- Migration: add_case_study_fields
-- Adds all extended fields to the case_studies table.
-- Safe to run against production — each column uses IF NOT EXISTS.
-- Original columns (id, title, slug, client, industry, challenge, solution,
-- results, excerpt, cover_image, tags, status, published_at, created_at,
-- updated_at) are left untouched.

ALTER TABLE case_studies
  ADD COLUMN IF NOT EXISTS subtitle            TEXT,
  ADD COLUMN IF NOT EXISTS hero_image_url      VARCHAR,

  -- Category tags (up to 3)
  ADD COLUMN IF NOT EXISTS category1           VARCHAR,
  ADD COLUMN IF NOT EXISTS category2           VARCHAR,
  ADD COLUMN IF NOT EXISTS category3           VARCHAR,

  -- Hero stats (up to 3)
  ADD COLUMN IF NOT EXISTS stat1_value         VARCHAR,
  ADD COLUMN IF NOT EXISTS stat1_label         VARCHAR,
  ADD COLUMN IF NOT EXISTS stat2_value         VARCHAR,
  ADD COLUMN IF NOT EXISTS stat2_label         VARCHAR,
  ADD COLUMN IF NOT EXISTS stat3_value         VARCHAR,
  ADD COLUMN IF NOT EXISTS stat3_label         VARCHAR,

  -- "In brief" sidebar summary
  ADD COLUMN IF NOT EXISTS in_brief            TEXT,

  -- Challenge section
  ADD COLUMN IF NOT EXISTS challenge_heading   VARCHAR,
  ADD COLUMN IF NOT EXISTS challenge_body      TEXT,
  ADD COLUMN IF NOT EXISTS challenge_item1     TEXT,
  ADD COLUMN IF NOT EXISTS challenge_item2     TEXT,
  ADD COLUMN IF NOT EXISTS challenge_item3     TEXT,
  ADD COLUMN IF NOT EXISTS challenge_item4     TEXT,
  ADD COLUMN IF NOT EXISTS challenge_item5     TEXT,

  -- Solution section
  ADD COLUMN IF NOT EXISTS solution_heading    VARCHAR,
  ADD COLUMN IF NOT EXISTS solution_body1      TEXT,
  ADD COLUMN IF NOT EXISTS solution_body2      TEXT,

  -- Pull quote
  ADD COLUMN IF NOT EXISTS quote_text          TEXT,
  ADD COLUMN IF NOT EXISTS quote_attribution   VARCHAR,
  ADD COLUMN IF NOT EXISTS quote_title         VARCHAR,

  -- Outcome section
  ADD COLUMN IF NOT EXISTS outcome_heading     VARCHAR,
  ADD COLUMN IF NOT EXISTS outcome_body        TEXT,
  ADD COLUMN IF NOT EXISTS outcome_metric1_value VARCHAR,
  ADD COLUMN IF NOT EXISTS outcome_metric1_label VARCHAR,
  ADD COLUMN IF NOT EXISTS outcome_metric2_value VARCHAR,
  ADD COLUMN IF NOT EXISTS outcome_metric2_label VARCHAR,

  -- Right sidebar metadata
  ADD COLUMN IF NOT EXISTS sidebar_industry    VARCHAR,
  ADD COLUMN IF NOT EXISTS sidebar_services    TEXT,
  ADD COLUMN IF NOT EXISTS sidebar_region      VARCHAR,
  ADD COLUMN IF NOT EXISTS sidebar_tech_stack  TEXT,

  -- "Read next" cards (up to 2)
  ADD COLUMN IF NOT EXISTS read_next1_category VARCHAR,
  ADD COLUMN IF NOT EXISTS read_next1_title    VARCHAR,
  ADD COLUMN IF NOT EXISTS read_next1_excerpt  TEXT,
  ADD COLUMN IF NOT EXISTS read_next2_category VARCHAR,
  ADD COLUMN IF NOT EXISTS read_next2_title    VARCHAR,
  ADD COLUMN IF NOT EXISTS read_next2_excerpt  TEXT,

  -- Author credit
  ADD COLUMN IF NOT EXISTS author              VARCHAR,

  -- SEO fields
  ADD COLUMN IF NOT EXISTS meta_title          VARCHAR,
  ADD COLUMN IF NOT EXISTS meta_description    TEXT,
  ADD COLUMN IF NOT EXISTS keywords            TEXT,
  ADD COLUMN IF NOT EXISTS canonical_url       VARCHAR,
  ADD COLUMN IF NOT EXISTS og_title            VARCHAR,
  ADD COLUMN IF NOT EXISTS og_description      TEXT,
  ADD COLUMN IF NOT EXISTS og_image_url        VARCHAR,
  ADD COLUMN IF NOT EXISTS json_ld             TEXT,
  ADD COLUMN IF NOT EXISTS no_index            BOOLEAN DEFAULT FALSE,

  -- HubSpot / UTM tracking
  ADD COLUMN IF NOT EXISTS hubspot_event_name  VARCHAR,
  ADD COLUMN IF NOT EXISTS hubspot_form_guid   VARCHAR,
  ADD COLUMN IF NOT EXISTS utm_source          VARCHAR,
  ADD COLUMN IF NOT EXISTS utm_medium          VARCHAR,
  ADD COLUMN IF NOT EXISTS utm_campaign        VARCHAR;
