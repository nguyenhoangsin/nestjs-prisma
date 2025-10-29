-- ============================================================================
-- SQL extensions for database structure (indexes, constraints, triggers, etc.)
-- Automatically applied after db push/reset in development
-- ============================================================================
-- Partial Unique Index: UserAppSetting
DROP INDEX IF EXISTS unique_user_app_setting_active;

CREATE UNIQUE INDEX unique_user_app_setting_active ON user_app_settings (user_id, app_id)
WHERE
  deleted_at IS NULL;
