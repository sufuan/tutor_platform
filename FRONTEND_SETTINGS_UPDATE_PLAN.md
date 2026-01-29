# Frontend Settings Update Plan

Due to the complexity of the changes requested, here's a comprehensive plan:

## Current Status
✅ Hero Title & Subtitle - DONE  
✅ Stats Section - DONE  
✅ Tab renamed to "Business Settings" - DONE
✅ Images (Hero & Banner) - DONE
✅ Footer & Contact - DONE

## Still Needed

### 1. Tuition Types Section (Dynamic)
**Database Storage:** Store as JSON in `site_settings` table  
**Fields per item:**
- title (string)
- description (text)
- icon (string - icon name)

**UI Improvements:**
- Repeater field with Add/Remove buttons
- Drag & drop reordering
- Icon picker with preview
- Individual save button

### 2. Serving Categories Section (Dynamic)
**Database Storage:** Store as JSON in `site_settings` table
**Fields per item:**
- name (string)
- icon (string - icon name)

**UI Improvements:**
- Repeater field with Add/Remove buttons
- Drag & drop reordering
- Icon picker
- Individual save button

### 3. How It Works Section (Dynamic)
**Database Storage:** Store as JSON in `site_settings` table
**Fields per item:**
- title (string)
- description (text)
- icon (string - icon name)

**UI Improvements:**
- Repeater field (exactly 4 steps)
- Icon picker
- Individual save button

### 4. Separate Save Buttons
Each section needs its own:
- Form wrapper
- Submit handler
- Save button
- Success toast notification

## Implementation Approach

### Backend Updates Needed:
1. Add new columns to site_settings or use existing JSON storage
2. Create separate update methods or keep unified but handle JSON fields
3. Update Welcome page controller to pass JSON data

### Frontend Updates Needed:
1. Split single large form into multiple forms
2. Add repeater components for dynamic lists
3. Add icon picker component
4. Individual save buttons per section
5. Better visual hierarchy with shadcn components

## Recommendation
Given the file size (1270+ lines), I recommend:
1. Creating a simplified version focusing on core functionality first
2. Using a single save button per major section (5-6 buttons total)
3. Keep the current working setup and enhance incrementally

Would you like me to:
A) Create the complete refactored version (will be ~2000 lines)
B) Add just the dynamic sections with minimal UI changes
C) Focus on making current sections work with separate save buttons first
