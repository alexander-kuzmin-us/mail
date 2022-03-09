document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none'; // Hide emails view
  document.querySelector('#compose-view').style.display = 'block'; // Show compose view

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = ''; // Clear recipients
  document.querySelector('#compose-subject').value = ''; // Clear subject
  document.querySelector('#compose-body').value = ''; // Clear body
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block'; // Show emails view
  document.querySelector('#compose-view').style.display = 'none'; // Hide compose view

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}