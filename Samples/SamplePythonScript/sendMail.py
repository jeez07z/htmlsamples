#!/usr/bin/python

import smtplib

# Send the mail
def eMail( FROM,TO,SUBJECT,TEXT,SERVER ):
        message = """\
        From: %s
        To: %s
        Subject: %s

        %s
        """ % (FROM, ", ".join(TO), SUBJECT, TEXT)

        server = smtplib.SMTP(SERVER)
        server.sendmail(FROM, TO, message)
        server.quit()
        return
