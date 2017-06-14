#!/usr/bin/python

import requests
import commands
import sendMail as sm

# Mail details
TO = ["jeez07z@gmail.com"]

SERVER = "localhost"
FROM = "sender@testsuj.com"
SUBJECT = "Error: Jenkins"
TEXT = "Jenkins Build for the Job Failed"

arg = raw_input('Enter Argument: ')
if (arg == "STANDARD_DS1" or arg == "STANDARD_DS2"):
        job_url = "http://admin:9cfa9d07278affe29a2b822f67137019@localhost:8081/job/NewDemo/build?token=NewDemo"
        status = requests.get(job_url)
        status, output = commands.getstatusoutput("curl --silent http://admin:9cfa9d07278affe29a2b822f67137019@localhost:8081/job/NewDemo/lastBuild/consoleText | grep -c FAILED")
        if (output == "1"):
                print "Failed: Sending eMail"
                sm.eMail(FROM,TO,SUBJECT,TEXT,SERVER)
        else:
                print "Jenkins Job Successful"
else:
        print "Error: This script accepts only STANDARD_DS1 or STANDARD_DS2 as valid arguments"
