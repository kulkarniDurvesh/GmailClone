from flask import Flask,request,jsonify
from datetime import datetime
import pandas as p
import smtplib as sm
# import tkinter as tk
# from tkinter import ttk
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pymongo import MongoClient
import imaplib
import email
from email.message import EmailMessage
# from auto import *
import quopri
import base64
import json

app = Flask(__name__)


# def members():
#      return {"member":["Mem1","Mem2","Mem3"]}
@app.route("/receive_email")
def receive_email():
        print("in recieve email")
        EMAIL = 'pythonlearnpython@gmail.com'
        PASSWORD = "jdik dfue xxgc ekgc"
        SERVER = 'imap.gmail.com'
        list_of_mail = []
        id=1
        mail = imaplib.IMAP4_SSL(SERVER)
        mail.login(EMAIL, PASSWORD)
        mail.select('inbox')
        
        result, data = mail.search(None, 'ALL')  # Fetch all emails, 'ALL' can be replaced with specific criteria
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
                                mail_from = email_message['From'].split('<')[0]
                                mail_to = email_message['To']
                                mail_subject = email_message['Subject']
                                mail_Date = datetime.strptime(email_message['Date'].split('(')[0].strip(),"%a, %d %b %Y %H:%M:%S %z").strftime("%B %d")
                                print(mail_Date)
                                body = part.get_payload(decode=True).decode(part.get_content_charset() or 'utf-8')
                                print("====================")
                                eachmail =  {"From": mail_from , "Subject": mail_subject, "To": mail_to,"Body": body,"Date":mail_Date}
                                eachmailwithid = {"id":id,"data":eachmail}
                                list_of_mail.append(eachmailwithid)
                                id +=1
                    else:
                        # Display plain text content for non-multipart emails
                        content_type = email_message.get_content_type()
                        if content_type == 'text/plain':
                            # body = email_message.get_payload(decode=True).decode(email_message.get_content_charset())
                            mail_from = email_message['From']
                            mail_to = email_message['To']
                            mail_subject = email_message['Subject']
                            mail_Date = datetime.strptime(email_message['Date'].split('(')[0].strip(),"%a, %d %b %Y %H:%M:%S %z").strftime("%B %d")
                            body = part.get_payload(decode=True).decode(part.get_content_charset() or 'utf-8')
                            print("====================")
                            # eachmail =  "From: "+ mail_from + "\n"+"Subject: " + mail_subject +"\n"+ "To: "+ mail_to+"\n"+ "Body: "+ body 
                            eachmail =  {"From": mail_from , "Subject": mail_subject, "To": mail_to,"Body": body,"Date":mail_Date}
                            eachmailwithid = {"id":id,"data":eachmail}
                            list_of_mail.append(eachmailwithid)
                            id +=1
        list_of_mail.sort(key=lambda x: x['id'], reverse=True)
        return list_of_mail       
                    
# Function to send emails
@app.route("/send_emails", methods=['POST'])
def send_emails():
        data = request.json
        print(data)
        To = data['To']
        Subject = data['Subject']
        Message = data['Message']
        From = data['from']
        try:
            outlook_email = "pythonlearnpython@gmail.com"
            outlook_password = "jdik dfue xxgc ekgc"
            server = smtplib.SMTP("smtp.gmail.com", 587)
            server.starttls()
            server.login(outlook_email, outlook_password)
            selected_emails = To
            message = MIMEMultipart("alternative")
            message["Subject"] = Subject
            message["From"] = outlook_email
            text = Message
            part2 = MIMEText(text, "plain")
            message.attach(part2)
            to_email = To
            email_list = convert_to_email_list(to_email)
            for to_each_email in email_list:
                server.sendmail(outlook_email, to_each_email, message.as_string())

            # for to_email in selected_emails:
            #     print('112')
            #     print(type(outlook_email))
            #     print(type(to_email))
            #     print(type(message.as_string()))
            #     print(to_email)
            #     server.sendmail(outlook_email, to_email, message.as_string())

            server.quit()
            return "Emails sent successfully!"

        except Exception as e:
            return {"Error": {str(e)}}
        # return {"message":"successfull"}


@app.route("/sent_email")
def sent_email():
        print("in sent email")
        EMAIL = 'pythonlearnpython@gmail.com'
        PASSWORD = "jdik dfue xxgc ekgc"
        SERVER = 'imap.gmail.com'
        list_of_mail = []
        id=1
        Pagecount_str = request.args.get('Pagecount')
        Pagecount = int(Pagecount_str)
        mail = imaplib.IMAP4_SSL(SERVER)
        mail.login(EMAIL, PASSWORD)
        mail.select('"[Gmail]/Sent Mail"')
        result, data = mail.search(None, 'ALL')  # Fetch all emails, 'ALL' can be replaced with specific criteria
        if result == 'OK':
            email_ids = data[0].split()
            email_ids.sort(reverse=True)
            
            first_10_mails = email_ids[(Pagecount*10)-10:Pagecount*10]
            for email_id in first_10_mails:
                print(email_id)
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
                                mail_to = email_message['Bcc']
                                mail_subject = email_message['Subject']
                                mail_Date = datetime.strptime(email_message['Date'].split('(')[0].strip(),"%a, %d %b %Y %H:%M:%S %z").strftime("%B %d")
                                body = part.get_payload(decode=True).decode(part.get_content_charset() or 'utf-8')
                                print("====================")
                                eachmail =  {"From": mail_from , "Subject": mail_subject, "To": mail_to,"Body": body,"Date":mail_Date}
                                eachmailwithid = {"id":id,"data":eachmail}
                                list_of_mail.append(eachmailwithid)
                                id +=1
                    else:
                        # Display plain text content for non-multipart emails
                        content_type = email_message.get_content_type()
                        if content_type == 'text/plain':
                            # body = email_message.get_payload(decode=True).decode(email_message.get_content_charset())
                            mail_from = email_message['From']
                            mail_to = email_message['To']
                            mail_subject = email_message['Subject']
                            mail_Date = datetime.strptime(email_message['Date'].split('(')[0].strip(),"%a, %d %b %Y %H:%M:%S %z").strftime("%B %d")
                            body = part.get_payload(decode=True).decode(part.get_content_charset() or 'utf-8')
                            print("====================")
                            # eachmail =  "From: "+ mail_from + "\n"+"Subject: " + mail_subject +"\n"+ "To: "+ mail_to+"\n"+ "Body: "+ body 
                            eachmail =  {"From": mail_from , "Subject": mail_subject, "To": mail_to,"Body": body,"Date":mail_Date}
                            eachmailwithid = {"id":id,"data":eachmail}
                            list_of_mail.append(eachmailwithid)
                            id +=1
        # list_of_mail.sort(key=lambda x: x['id'], reverse=True)
        return list_of_mail  


def convert_to_email_list(to_email):
    if ',' in to_email:  # Check if the string contains a comma
        email_list = [email.strip() for email in to_email.split(',')]  # Split multiple emails by comma
    else:
        email_list = [to_email.strip()]  # If there's only one email, create a list with one element
    
    print(email_list)
    return email_list
      


if __name__ == "__main__":
     app.run(debug=True)