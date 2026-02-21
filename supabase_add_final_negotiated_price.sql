-- Add final_negotiated_price column to calculations table
-- This column tracks the final agreed price after negotiation (PRO feature)

ALTER TABLE calculations 
ADD COLUMN final_negotiated_price INTEGER;

-- Add a comment to the column
COMMENT ON COLUMN calculations.final_negotiated_price IS 'Final negotiated price agreed with the sponsor (PRO feature only)';

-- Optional: Add an index for faster queries on this column
CREATE INDEX idx_calculations_final_price ON calculations(final_negotiated_price) 
WHERE final_negotiated_price IS NOT NULL;

-- Verify the change
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'calculations' 
AND column_name = 'final_negotiated_price';
