# User Management Dashboard

A responsive User Management Dashboard built using React, Axios, Tailwind CSS, and the JSONPlaceholder API. The application allows users to view, add, edit, delete, search, sort, filter, and paginate user records.

---

## Features

* View all users from API
* Add new users
* Edit existing users
* Delete users
* Search users by name, email, or department
* Sort users by ID, First Name, Last Name, and Department
* Filter users using a dedicated filter popup
* Pagination support (10, 25, 50, 100 records per page)
* Form validation
* Error handling
* Responsive design

---

## Tech Stack

* React.js
* Axios
* Tailwind CSS
* JSONPlaceholder API

---

## Project Structure

```text
src/
│
├── components/
│   ├── UserTable.jsx
│   └── UserForm.jsx
│
├── pages/
│   └── Dashboard.jsx
│
├── services/
│   └── api.js
│
├── App.jsx
└── main.jsx
```

---

## Installation and Setup

### 1. Clone Repository

```bash
git clone https://github.com/Ujwal1256/User-Management-DashBoard-App.git
```

### 2. Navigate to Project

```bash
cd user-management-dashboard
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

### 5. Open Browser

```text
http://localhost:5173
```

---

## API Used

JSONPlaceholder API

```text
https://jsonplaceholder.typicode.com/users
```

### Endpoints Used

```http
GET    /users
POST   /users
PUT    /users/:id
DELETE /users/:id
```

> Note: JSONPlaceholder simulates POST, PUT, and DELETE operations but does not permanently store changes. Local React state is used to reflect these operations in the UI.

---

## Assumptions Made

* Each user contains:

  * ID
  * First Name
  * Last Name
  * Email
  * Department

* Since JSONPlaceholder returns a single `name` field, it is split into First Name and Last Name for display purposes.

* Department information is derived from the user's company name.

* Add, Edit, and Delete operations are maintained locally because JSONPlaceholder does not persist changes.

---

## Challenges Faced During Development

### 1. Working with a Mock API

JSONPlaceholder does not permanently save POST, PUT, or DELETE requests.

**Solution:**

After receiving a successful API response, the local React state was updated manually to keep the UI synchronized with user actions.

---

### 2. Managing State Across Multiple Features

The application includes:

* CRUD operations
* Search
* Sorting
* Filtering
* Pagination

Combining these features while keeping the code organized required careful state management.

**Solution:**

Derived data was used instead of creating unnecessary state variables.

Data flow:

```text
Users
 ↓
Search
 ↓
Filter
 ↓
Sort
 ↓
Pagination
 ↓
Display
```

---

### 3. Keeping Components Reusable

The Add User and Edit User functionalities required nearly identical forms.

**Solution:**

A single reusable `UserForm` component was created and used for both operations.

---

### 4. Pagination with Search and Filters

Changing search terms or filters while on later pages could result in empty tables.

**Solution:**

Pagination was reset whenever search or filter criteria changed.

---

### 5. Form Validation

Invalid or incomplete data could lead to poor user experience.

**Solution:**

Client-side validation was implemented for all required fields before submission.

---

## Improvements If Given More Time

### 1. Server-Side Pagination

For large datasets, pagination should be handled by the backend instead of loading all records on the client.

### 2. Server-Side Search and Filtering

Searching and filtering could be performed through API requests to improve performance for larger datasets.

### 3. Toast Notifications

Replace browser alerts with modern toast notifications for:

* Add Success
* Update Success
* Delete Success
* Error Messages

### 4. Custom Confirmation Modal

Replace `window.confirm()` with a reusable modal component for a better user experience.

### 5. Loading States and Skeleton Screens

Provide visual feedback while API requests are in progress.

### 6. Unit and Integration Testing

Add automated tests using:

* React Testing Library
* Jest

### 7. State Management Optimization

For larger applications, introduce:

* React Context API
* Redux Toolkit

### 8. API Caching and Synchronization

Use React Query (TanStack Query) for caching, background refetching, and improved API state management.

---

## Future Enhancements

* Authentication and Authorization
* Dark Mode
* Export Users to CSV/Excel
* User Profile Pages
* Advanced Filtering
* Bulk Delete Operations
* Responsive Mobile Navigation

---

## Conclusion

This project demonstrates core frontend development concepts including API integration, CRUD operations, state management, form handling, validation, searching, sorting, filtering, pagination, and responsive UI development using React and Tailwind CSS. The application was designed with scalability, reusability, and maintainability in mind.