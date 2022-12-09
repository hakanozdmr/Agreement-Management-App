package com.ozdemirhakan.Agreement.Management.Application.core.mailsender;

import com.ozdemirhakan.Agreement.Management.Application.business.abstracts.AgreementService;
import com.ozdemirhakan.Agreement.Management.Application.core.utilities.results.DataResult;
import com.ozdemirhakan.Agreement.Management.Application.entities.concretes.Agreement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;

@Component
public class MailSenderJob {

    AgreementService agreementService;

    @Autowired private EmailService emailService;

    @Autowired
    public MailSenderJob( AgreementService agreementService,EmailService emailService) {
        super();
        this.agreementService = agreementService;
        this.emailService = emailService;

    }

    public String
    sendMail(EmailDetails details)
    {
        String status
                = emailService.sendSimpleMail(details);

        return status;
    }
    // Sending email with attachment
    public String sendMailWithAttachment(
            EmailDetails details)
    {
        String status
                = emailService.sendMailWithAttachment(details);

        return status;
    }

    @Scheduled(cron = "0 0 */12 * * *")
    @Transactional
    public void execute()  {
        for(Agreement agreement : agreementService.getAgreementLastMonth()) {
            if (agreement.getActive() == true) {
                System.out.println("True "+agreement.getAgreementName());
                var userEmail = agreement.getUser().getEmail();
                var endDate = agreement.getEndDate();
                var message = "Sözleşme Bitiş Tarihine 1 aydan daha az bir süre kaldı. \n  Sözleşme Bitiş Tarihiniz :" + endDate;
                var subject = "Sözleşme Bitiş Tarihi Hakkında";
                var attachment = "";
                EmailDetails details = new EmailDetails(userEmail, message, subject, attachment);
                sendMail(details);

            }else {
                System.out.println("False "+agreement.getAgreementName());
                continue;
            }
        }
        }

    @Scheduled(cron = "0 0 */12 * * *")
    @Transactional
    public void setPassive()  {
        for(Agreement agreement : agreementService.getAgreementEndedDate()) {
            if (agreement.getActive() == true) {
                System.out.println("True "+agreement.getAgreementName());
               agreement.setActive(false);
            }else {
                System.out.println("False "+agreement.getAgreementName());
                continue;
            }
        }
    }

}