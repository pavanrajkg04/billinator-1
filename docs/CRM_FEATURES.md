# Complete CRM System - Billinator

## Overview
Billinator now includes a complete CRM (Customer Relationship Management) system with all essential features for managing customers, sales pipeline, quotes, activities, and communications.

## Database Schema

### New Tables Created:
1. **opportunities** - Sales opportunities/deals with pipeline stages
2. **quotes** - Quotes/estimates before converting to invoices
3. **quote_items** - Line items for quotes
4. **activities** - Tasks, calls, meetings, notes
5. **customer_notes** - Communication log and notes for customers
6. **customer_contacts** - Multiple contacts per customer
7. **customer_tags** - Customer segmentation/tagging
8. **customer_tag_mapping** - Customer-tag relationships

## Backend Services

### 1. Opportunity Service (`services/opportunity_service.py`)
- Create, read, update, delete opportunities
- Pipeline statistics
- Filter by stage, status, customer
- Track deal value, probability, expected close date

### 2. Quote Service (`services/quote_service.py`)
- Create quotes with line items
- Auto-generate quote numbers
- Calculate totals (subtotal, tax, total)
- Convert quotes to invoices
- Track quote status (DRAFT, SENT, ACCEPTED, REJECTED, EXPIRED)

### 3. Activity Service (`services/activity_service.py`)
- Manage tasks, calls, meetings, notes
- Track due dates and priorities
- Get pending and upcoming tasks
- Mark activities as completed

### 4. Note Service (`services/note_service.py`)
- Create notes for customers
- Link notes to opportunities/quotes
- Track communication history
- Different note types (NOTE, CALL, EMAIL, MEETING)

### 5. Contact Service (`services/contact_service.py`)
- Multiple contacts per customer
- Primary contact designation
- Contact details (email, phone, designation, department)

## API Endpoints

### Opportunities (`/api/opportunities`)
- `GET /` - List opportunities (with filters)
- `GET /pipeline` - Get pipeline statistics
- `GET /{id}` - Get opportunity details
- `POST /` - Create opportunity
- `PUT /{id}` - Update opportunity
- `DELETE /{id}` - Delete opportunity

### Quotes (`/api/quotes`)
- `GET /` - List quotes (with filters)
- `GET /{id}` - Get quote with items
- `POST /` - Create quote
- `PUT /{id}` - Update quote
- `DELETE /{id}` - Delete quote
- `POST /{id}/convert` - Convert quote to invoice

### Activities (`/api/activities`)
- `GET /` - List activities (with filters)
- `GET /pending` - Get pending tasks
- `GET /upcoming` - Get upcoming tasks
- `GET /{id}` - Get activity details
- `POST /` - Create activity
- `PUT /{id}` - Update activity
- `DELETE /{id}` - Delete activity

### Notes (`/api/notes`)
- `GET /customer/{customer_id}` - List notes for customer
- `GET /{id}` - Get note details
- `POST /` - Create note
- `PUT /{id}` - Update note
- `DELETE /{id}` - Delete note

### Contacts (`/api/contacts`)
- `GET /customer/{customer_id}` - List contacts for customer
- `GET /{id}` - Get contact details
- `POST /` - Create contact
- `PUT /{id}` - Update contact
- `DELETE /{id}` - Delete contact

## Frontend Pages

### 1. Opportunities Page (`/opportunities`)
- Sales pipeline view with stage filters
- Pipeline statistics dashboard
- List all opportunities with filters
- Create/edit/delete opportunities
- Stage-based kanban view (can be added)

### 2. Quotes Page (`/quotes`) - To be built
- List all quotes
- Create quotes with line items
- View quote details
- Convert quotes to invoices
- Quote status management

### 3. Activities Page (`/activities`) - To be built
- Task list with filters
- Calendar view
- Pending tasks dashboard
- Create/edit/complete activities

### 4. Enhanced Customer Page (`/customers/[id]`) - To be built
- Customer details
- Contact list
- Notes/communication log
- Activity timeline
- Related opportunities
- Related quotes
- Sales history

## Key Features

### Sales Pipeline Management
- **Stages**: Lead → Qualified → Proposal → Negotiation → Won/Lost
- Track deal value and probability
- Expected close dates
- Assign opportunities to team members
- Source tracking

### Quote Management
- Create professional quotes
- Multiple line items
- Tax calculations
- Quote validity dates
- Status tracking
- Convert to invoices

### Activity Management
- **Types**: Call, Email, Meeting, Task, Note
- Due dates and priorities
- Assignment to team members
- Completion tracking
- Upcoming tasks view

### Customer Communication
- Communication log
- Multiple contacts per customer
- Notes linked to opportunities/quotes
- Activity timeline
- Customer history

## Usage Examples

### Creating an Opportunity
```python
opportunity_data = {
    "customer_id": 1,
    "title": "New Deal with ABC Corp",
    "value": 50000.00,
    "probability": 75,
    "stage": "PROPOSAL",
    "expected_close_date": "2024-12-31",
    "source": "WEBSITE"
}
opportunity_service.create_opportunity(tenant_id, user_id, opportunity_data)
```

### Creating a Quote
```python
quote_data = {
    "customer_id": 1,
    "quote_date": "2024-01-15",
    "valid_until": "2024-02-15",
    "items": [
        {
            "product_id": 1,
            "description": "Product Name",
            "quantity": 10,
            "unit_price": 1000.00,
            "tax_rate": 18.0,
            "line_total": 11800.00
        }
    ]
}
quote_service.create_quote(tenant_id, user_id, quote_data)
```

### Creating an Activity
```python
activity_data = {
    "customer_id": 1,
    "type": "CALL",
    "subject": "Follow-up call",
    "description": "Discuss proposal details",
    "due_date": "2024-01-20T10:00:00",
    "priority": "HIGH"
}
activity_service.create_activity(tenant_id, user_id, activity_data)
```

## Next Steps

1. **Complete Frontend Pages**:
   - Quotes page with form
   - Activities/Tasks page
   - Enhanced customer detail page
   - Customer timeline view

2. **Additional Features**:
   - Email integration
   - Calendar integration
   - Document attachments
   - Advanced reporting
   - Sales forecasting
   - Customer segmentation

3. **UI Enhancements**:
   - Kanban board for pipeline
   - Calendar view for activities
   - Dashboard widgets
   - Charts and graphs

## Integration Points

- **Sales Invoices**: Quotes can be converted to sales invoices
- **Customers**: All CRM features link to customers
- **Products**: Quotes use product catalog
- **Users**: Activities and opportunities can be assigned to users

## Database Migration

The CRM schema is automatically initialized when the application starts. If you have an existing database, run:

```python
from database.crm_schema import init_crm_schema
init_crm_schema()
```

Or restart the application - it will auto-initialize.

