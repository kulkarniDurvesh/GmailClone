from flask import Flask
import pandas as p
import smtplib as sm
# import tkinter as tk
# from tkinter import ttk
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pymongo import MongoClient
import imaplib
import email
from email.message import EmailMessage
from auto import *
import quopri
import base64
import json

app = Flask(__name__)

@app.route("/receive_email")

# def members():
#      return {"member":["Mem1","Mem2","Mem3"]}

def receive_email():
        print("in recieve email")
        EMAIL = 'pythonlearnpython@gmail.com'
        PASSWORD = "jdik dfue xxgc ekgc"
        SERVER = 'imap.gmail.com'
        list_of_mail = []
        eachmail={}
        collectmail={}
        id=0
        mail = imaplib.IMAP4_SSL(SERVER)
        mail.login(EMAIL, PASSWORD)
        mail.select('inbox')
        result, data = mail.search(None, 'ALL')  # Fetch all emails, 'ALL' can be replaced with specific criteria
        print(data)
        print(result)
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
                                print("====================")
                                eachmail["From: "]= mail_from
                                eachmail["Subject: "]= mail_subject
                                eachmail["To: "]= mail_to
                                eachmail["Body: "]= body
                                collectmail[id]=eachmail
                                id +=1
                                #print(collectmail) 
                                list_of_mail.append(collectmail)
                    else:
                        # Display plain text content for non-multipart emails
                        content_type = email_message.get_content_type()
                        if content_type == 'text/plain':
                            # body = email_message.get_payload(decode=True).decode(email_message.get_content_charset())
                            mail_from = email_message['From']
                            mail_to = email_message['To']
                            mail_subject = email_message['Subject']
                            body = part.get_payload(decode=True).decode(part.get_content_charset() or 'utf-8')
                            print("====================")
                            eachmail["From: "]= mail_from
                            eachmail["Subject: "]= mail_subject
                            eachmail["To: "]= mail_to
                            eachmail["Body: "]= body
                            collectmail[id]=eachmail
                            id +=1
                            #print(collectmail) 
                            list_of_mail.append(collectmail)
        return json.dumps(list_of_mail)           
                    


if __name__ == "__main__":
     app.run()