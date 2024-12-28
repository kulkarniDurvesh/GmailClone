import tkinter as tk
from tkinter import ttk
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pymongo import MongoClient

# Function to send emails
def send_emails():
    selected_emails = [email_listbox.get(idx) for idx in email_listbox.curselection()]
    if not selected_emails:
        status_label.config(text="Select at least one email.")
        return

    try:
        outlook_email = "pythonlearnpython@gmail.com"
        outlook_password = "jdik dfue xxgc ekgc"
        
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(outlook_email, outlook_password)

        message = MIMEMultipart("alternative")
        message["Subject"] = subject_entry.get()
        message["From"] = outlook_email
        text = message_text.get("1.0", "end")
        part2 = MIMEText(text, "plain")
        message.attach(part2)

        for to_email in selected_emails:
            server.sendmail(outlook_email, to_email, message.as_string())

        server.quit()
        status_label.config(text="Emails sent successfully!")

    except Exception as e:
        status_label.config(text=f"Error: {str(e)}")

# Function to add an email to the database
def add_email():
    new_email = email_entry.get()
    if new_email:
        try:
            collection.insert_one({"Email": new_email})
            email_listbox.insert(tk.END, new_email)
            email_entry.delete(0, tk.END)
            status_label.config(text=f"Added {new_email} to the database.")
        except Exception as e:
            status_label.config(text=f"Error adding email: {str(e)}")
    else:
        status_label.config(text="Please enter an email to add.")

# Initialize Tkinter window
root = tk.Tk()
root.title("Email Sender - Outlook-like")

# Create and configure widgets
frame = ttk.Frame(root)
frame.grid(row=0, column=0, padx=10, pady=10, sticky=(tk.W, tk.E, tk.N, tk.S))

email_listbox = tk.Listbox(frame, selectmode=tk.MULTIPLE)
email_listbox.grid(row=0, column=0, rowspan=4, padx=10, pady=10)

scrollbar = tk.Scrollbar(frame, orient=tk.VERTICAL)
scrollbar.grid(row=0, column=1, rowspan=4, sticky=(tk.N, tk.S))

email_listbox.config(yscrollcommand=scrollbar.set)
scrollbar.config(command=email_listbox.yview)

subject_label = ttk.Label(frame, text="Subject:")
subject_label.grid(row=0, column=2, padx=10, pady=10)

subject_entry = ttk.Entry(frame)
subject_entry.grid(row=0, column=3, padx=10, pady=10)

message_label = ttk.Label(frame, text="Message:")
message_label.grid(row=1, column=2, padx=10, pady=10)

message_text = tk.Text(frame, height=5, width=40)
message_text.grid(row=1, column=3, padx=10, pady=10, rowspan=3)

send_button = ttk.Button(frame, text="Send Emails", command=send_emails)
send_button.grid(row=4, column=3, padx=10, pady=10, sticky=tk.E)

status_label = ttk.Label(frame, text="")
status_label.grid(row=5, column=0, columnspan=4, padx=10, pady=10)

# Add email entry field and button
email_label = ttk.Label(frame, text="Add Email:")
email_label.grid(row=4, column=0, padx=10, pady=10, sticky=tk.W)

email_entry = ttk.Entry(frame)
email_entry.grid(row=4, column=1, padx=10, pady=10)

add_email_button = ttk.Button(frame, text="Add Email", command=add_email)
add_email_button.grid(row=4, column=2, padx=10, pady=10)

# Connect to MongoDB and populate the email listbox
try:
    client = MongoClient("mongodb://localhost:27017/")
    mydatabase = client["test"]
    collection = mydatabase["mycollection"]
    cursor = collection.find()

    for record in cursor:
        email_listbox.insert(tk.END, record["Email"])

except Exception as e:
    status_label.config(text=f"Could not connect to MongoDB: {str(e)}")

# Start the Tkinter main loop
root.mainloop()

