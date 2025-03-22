function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  
  // Fetch emails from the specified mailbox
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
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