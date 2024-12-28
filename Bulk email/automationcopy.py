import pandas as p
import smtplib as sm
import tkinter as tk
from tkinter import ttk
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pymongo import MongoClient
import imaplib
import email
from email.message import EmailMessage
from auto import *
import quopri
import base64



# data = p.read_excel("student.xlsx")

# email_column = data.get("email")
# list_of_email = list(email_column)
#print(list_of_email)



def compose_emails():
        print("in compose mails")

        client = MongoClient("mongodb://localhost:27017/")
        mydatabase = client["test"]
        collection = mydatabase["mycollection"]
        cursor = collection.find()
        print(cursor)


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

        for record in cursor:
         email_listbox.insert(tk.END, record["Email"])



def send_emails():
      print("in send mail")
      send_emails()


def add_email():
     print("in add mail")


def receive_email():
        print("in recieve email")
        EMAIL = 'pythonlearnpython@gmail.com'
        PASSWORD = "jdik dfue xxgc ekgc"
        SERVER = 'imap.gmail.com'

        mail = imaplib.IMAP4_SSL(SERVER)
        mail.login(EMAIL, PASSWORD)
        mail.select('inbox')
        result, data = mail.search(None, 'ALL')  # Fetch all emails, 'ALL' can be replaced with specific criteria
        print(data)
        if result == 'OK':
            email_ids = data[0].split()
            for email_id in email_ids:
                    # Fetch only the email headers and body structure
                result, email_data = mail.fetch(email_id, '(RFC822)')
                if result == 'OK':
                    raw_email = email_data[0][1]
                    email_message = email.message_from_bytes(raw_email)
                    # Check if the email is plain text
                    if email_message.is_multipart():
                        for part in email_message.walk():
                            content_type = part.get_content_type()
                            if content_type == 'text/plain':
                                # Display plain text content
                                mail_from = email_message['From']
                                mail_to = email_message['To']
                                mail_subject = email_message['Subject']
                                body = part.get_payload(decode=True).decode(part.get_content_charset() or 'utf-8')
                                receive_email_listbox.insert(tk.END,f'From: {mail_from}',f'Subject: {mail_subject}',f'To: {mail_to}',f'Body: {body}')
                                print("====================")
                    else:
                        # Display plain text content for non-multipart emails
                        content_type = email_message.get_content_type()
                        if content_type == 'text/plain':
                            # body = email_message.get_payload(decode=True).decode(email_message.get_content_charset())
                            mail_from = email_message['From']
                            mail_to = email_message['To']
                            mail_subject = email_message['Subject']
                            body = part.get_payload(decode=True).decode(part.get_content_charset() or 'utf-8')
                            receive_email_listbox.insert(tk.END,f'From: {mail_from}',f'Subject: {mail_subject}',f'To: {mail_to}',f'Body: {body}')

                            print("====================")






root = tk.Tk()
root.title("Email Sender - Gmail-like")
#start framing Gmail-Like
# root.columnconfigure(0,weight=1)    #confiugures column 0 to stretch with a scaler of 1.
# root.rowconfigure(0,weight=1) 
frame = ttk.Frame(root)
width = frame.winfo_screenwidth()
height = frame.winfo_screenheight()
root.geometry("%dx%d" % (width, height))
 


compose_button = ttk.Button(root, text="Compose", command=compose_emails)
compose_button.grid(row=0, column=0, padx=10, pady=10, sticky=tk.E)

# Separator object
separator = ttk.Separator(root, orient='vertical')
separator.place(relx=0.15, rely=0, relwidth=0.2, relheight=1)


receive_email_listbox = tk.Listbox(root, height=45, width=200,selectmode=tk.MULTIPLE)
receive_email_listbox.grid(row=0, column=5,columnspan=5, rowspan=4, padx=150, pady=10)

def onload():
     print("in callback")
     receive_email()

# root.bind('<Visibility>', callback)

root.after(1000,onload )

# try:
#         client = MongoClient("mongodb://localhost:27017/")
#         mydatabase = client["test"]
#         collection = mydatabase["mycollection"]
#         cursor = collection.find()
#         print(cursor)

#         for record in cursor:
#         email_listbox.insert(tk.END, record["Email"])

#         # print("Connected successfully!!!")
#         # server=sm.SMTP("smtp.gmail.com",587)
#         # server.starttls() #established secure connection
#         # server.login("pythonlearnpython@gmail.com","qyve dxvb azva zbwa")
#         # from_ = "pythonlearnpython@gmail.com"
#         # #to_ = list_of_email
#         # message = MIMEMultipart("alternative")
#         # message['Subject'] = "This is testing mail from durvesh"
#         # message['From'] = 'pythonlearnpython@gmail.com'
#         # text = "Hi how are you?"
#         # part2 = MIMEText(text,"text")
#         # #print(record["Email"])
#         # message.attach(part2)
#         # html = """<html><table border="1"><tr><th>Name</th><th>Email</th><th>PhoneNo</th></tr>"""
#         # for record in cursor:
#         #      print(record["Name"])
#         #      html += "  <tr>\n"
#         #      for column in record:
#         #         html += "    <td>{0}</td>\n".format(column.strip())
#         #      html += "  </tr>\n"
            

#         # html += '</table></html>'

#         # file_ = open('result.html', 'w')
#         # file_.write(html)
#         # file_.close()

#         # # for record in cursor:
#         # #      server.sendmail(from_,record["Email"],message.as_string())

#         # print("message has been send to emails.")

# except Exception as e:
#     print("Could not connect to MongoDB")
#     print(e)


root.mainloop()