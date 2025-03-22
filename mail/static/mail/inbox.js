document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // Add event listener for compose form submission
  document.querySelector('#compose-form').addEventListener('submit', send_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  if (document.querySelector('#email-view')) {
    document.querySelector('#email-view').style.display = 'none';
  }
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function send_email(event) {
  // Prevent default submission behavior
  event.preventDefault();
  
  // Collect form data
  const recipients = document.querySelector('#compose-recipients').value;
  const subject = document.querySelector('#compose-subject').value;
  const body = document.querySelector('#compose-body').value;
  
  // Send POST request to /emails
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
      recipients: recipients,
      subject: subject,
      body: body
    })
  })
  .then(response => response.json())
  .then(result => {
    // If email sent successfully, load sent mailbox
    if (result.message) {
      load_mailbox('sent');
    } else {
      // If there's an error, alert the user
      alert(result.error);
    }
  })
  .catch(error => {
    console.log('Error:', error);
    alert('An error occurred while sending the email.');
  });
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  if (document.querySelector('#email-view')) {
    document.querySelector('#email-view').style.display = 'none';
  }

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  
  // Fetch emails from the specified mailbox
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
    // Check if there are emails to display
    if (emails.length === 0) {
      document.querySelector('#emails-view').innerHTML += '<p>No emails in this mailbox.</p>';
      return;
    }
    
    // Loop through emails and create a div for each
    emails.forEach(email => {
      // Create div for email
      const emailElement = document.createElement('div');
      emailElement.classList.add('email-row');
      emailElement.innerHTML = `
        <div class="sender"><strong>${email.sender}</strong></div>
        <div class="subject">${email.subject}</div>
        <div class="timestamp">${email.timestamp}</div>
      `;
      
      // Style the email based on read/unread status
      if (email.read) {
        emailElement.style.backgroundColor = 'lightgray';
      } else {
        emailElement.style.backgroundColor = 'white';
      }
      
      // Add border and styling
      emailElement.style.border = '1px solid #ccc';
      emailElement.style.padding = '10px';
      emailElement.style.marginBottom = '8px';
      emailElement.style.display = 'flex';
      emailElement.style.justifyContent = 'space-between';
      emailElement.style.cursor = 'pointer';
      
      // Add click event to view the email
      emailElement.addEventListener('click', function() {
        view_email(email.id);
      });
      
      // Add email to the view
      document.querySelector('#emails-view').append(emailElement);
    });
  })
  .catch(error => {
    console.log('Error loading mailbox:', error);
    document.querySelector('#emails-view').innerHTML += 
      '<p>Error loading emails. Please try again.</p>';
  });
}

function view_email(email_id) {
  // Create email-view if it doesn't exist
  if (!document.querySelector('#email-view')) {
    const emailView = document.createElement('div');
    emailView.id = 'email-view';
    document.querySelector('.container').appendChild(emailView);
  }
  
  // Show email view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'block';
  
  // Fetch the email details
  fetch(`/emails/${email_id}`)
  .then(response => response.json())
  .then(email => {
    // Display email content
    document.querySelector('#email-view').innerHTML = `
      <div class="email-detail">
        <p><strong>From:</strong> ${email.sender}</p>
        <p><strong>To:</strong> ${email.recipients.join(', ')}</p>
        <p><strong>Subject:</strong> ${email.subject}</p>
        <p><strong>Timestamp:</strong> ${email.timestamp}</p>
        <hr>
        <div class="email-body">${email.body.replace(/\n/g, '<br>')}</div>
        <hr>
        <button class="btn btn-sm btn-outline-primary" id="reply-button">Reply</button>
        <button class="btn btn-sm btn-outline-primary" id="archive-button">
          ${email.archived ? 'Unarchive' : 'Archive'}
        </button>
        <button class="btn btn-sm btn-outline-primary" id="back-button">Back to Inbox</button>
      </div>
    `;
    
    // Only show archive button for received emails, not for sent emails
    if (email.sender === document.querySelector('#compose-form input[disabled]').value) {
      document.querySelector('#archive-button').style.display = 'none';
    }
    
    // Add event listener for reply button
    document.querySelector('#reply-button').addEventListener('click', () => {
      reply_to_email(email);
    });
    
    // Add event listener for archive/unarchive button
    document.querySelector('#archive-button').addEventListener('click', () => {
      toggle_archive(email.id, !email.archived);
    });
    
    // Add event listener for back button
    document.querySelector('#back-button').addEventListener('click', () => {
      load_mailbox('inbox');
    });
    
    // Mark email as read if it isn't already
    if (!email.read) {
      fetch(`/emails/${email_id}`, {
        method: 'PUT',
        body: JSON.stringify({
          read: true
        })
      });
    }
  })
  .catch(error => {
    console.log('Error loading email:', error);
    document.querySelector('#email-view').innerHTML = '<p>Error loading email. Please try again.</p>';
  });
}

function toggle_archive(email_id, archive_status) {
  // Send PUT request to update the archived status
  fetch(`/emails/${email_id}`, {
    method: 'PUT',
    body: JSON.stringify({
      archived: archive_status
    })
  })
  .then(response => {
    // Check if request was successful
    if (response.status === 204) {
      // Load inbox after archiving/unarchiving
      load_mailbox('inbox');
    } else {
      // Handle error
      return response.json().then(data => {
        throw new Error(data.error || 'Failed to update archive status');
      });
    }
  })
  .catch(error => {
    console.log('Error updating archive status:', error);
    alert('Error updating archive status: ' + error.message);
  });
}

function reply_to_email(email) {
  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Pre-fill the composition fields
  document.querySelector('#compose-recipients').value = email.sender;
  
  // Add "Re: " prefix to subject if not already present
  let subject = email.subject;
  if (!subject.startsWith('Re: ')) {
    subject = 'Re: ' + subject;
  }
  document.querySelector('#compose-subject').value = subject;
  
  // Pre-fill the body with the original message
  document.querySelector('#compose-body').value = 
    `On ${email.timestamp} ${email.sender} wrote:\n\n${email.body}\n\n`;
}