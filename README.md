# Single-Page Email Client Application

A front-end JavaScript email client application that makes API calls to send and receive emails. This project demonstrates dynamic content loading, API interactions, and single-page application architecture using vanilla JavaScript.

![Email Client Screenshot](https://via.placeholder.com/800x400?text=Email+Client+Screenshot)

## Features

- **Email Management**: View emails in Inbox, Sent, and Archive folders
- **Email Composition**: Create, send, and reply to emails
- **Dynamic UI**: Single-page application with no page reloads
- **Email Organization**: Archive and unarchive emails
- **Read Status**: Visual indication of read and unread emails
- **Reply Functionality**: Automatically pre-filled reply forms

## Technologies Used

- JavaScript (ES6+)
- HTML5/CSS3
- Fetch API for AJAX requests
- Django backend (provided)
- Bootstrap for styling

## Getting Started

### Prerequisites

- Python 3.6+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mail.git
   cd mail
   ```

2. **Set up a virtual environment**
   ```bash
   python3 -m venv venv
   ```

3. **Activate the virtual environment**
   ```bash
   source venv/bin/activate
   ```

4. **Install dependencies**
   ```bash
   pip install django
   ```

5. **Apply migrations**
   ```bash
   python manage.py makemigrations mail
   python manage.py migrate
   ```

6. **Start the development server**
   ```bash
   python manage.py runserver
   ```

7. **Access the application**
   Open your browser and navigate to: http://127.0.0.1:8000/

8. **Deactivate virtual environment when finished**
   ```bash
   deactivate
   ```

## Usage

1. **Register or Log in**: Create an account using any email address and password (no real emails are sent)
2. **Navigate mailboxes**: Use the buttons to switch between Inbox, Sent, and Archive views
3. **Compose emails**: Click the Compose button to create a new email
4. **View emails**: Click on any email in a mailbox to view its contents
5. **Archive/Unarchive**: Manage emails by archiving or unarchiving them
6. **Reply**: Respond to emails with pre-filled recipient and subject fields

## Project Structure

```
mail/
├── mail/                  # Django app
│   ├── static/            # Static files
│   │   └── mail/
│   │       ├── inbox.js   # Frontend JavaScript
│   │       └── styles.css # CSS styles
│   ├── templates/         # HTML templates
│   ├── models.py          # Database models
│   ├── urls.py            # URL routing
│   └── views.py           # API endpoints
├── project3/              # Django project settings
└── manage.py              # Django management script
```

## API Endpoints

- `GET /emails/<mailbox>` - Get all emails in a mailbox
- `GET /emails/<email_id>` - Get a specific email
- `POST /emails` - Send a new email
- `PUT /emails/<email_id>` - Update email properties (read/archived)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Project created as part of CS50's Web Programming with Python and JavaScript
- Utilizes a Django backend API for email storage and retrieval

---

Keywords: JavaScript email client, single-page application, AJAX, email management, web development, frontend project, CS50, Django API