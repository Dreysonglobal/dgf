/**
 * Dreyson Global Foundation (DGF) - Join Us Form Handler
 * Formats prospective member responses and opens direct WhatsApp chat (09056068122)
 */

document.addEventListener('DOMContentLoaded', () => {
  const joinForm = document.getElementById('dgfJoinForm');

  if (joinForm) {
    // Dynamic toggle for Donation details box
    const donationRadios = document.querySelectorAll('input[name="hasDonation"]');
    const donationDetailsGroup = document.getElementById('donationDetailsGroup');

    donationRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.value === 'Yes' && donationDetailsGroup) {
          donationDetailsGroup.style.display = 'block';
        } else if (donationDetailsGroup) {
          donationDetailsGroup.style.display = 'none';
        }
      });
    });

    // Dynamic toggle for Volunteer interests box
    const volunteerRadios = document.querySelectorAll('input[name="volunteerField"]');
    const volunteerSkillsGroup = document.getElementById('volunteerSkillsGroup');

    volunteerRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.value === 'Yes' && volunteerSkillsGroup) {
          volunteerSkillsGroup.style.display = 'block';
        } else if (volunteerSkillsGroup) {
          volunteerSkillsGroup.style.display = 'none';
        }
      });
    });

    // Form Submit Handler
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('fullName').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim() || 'Not Provided';
      const location = document.getElementById('location').value.trim() || 'Lagos, Nigeria';
      const reason = document.getElementById('reason').value.trim();
      
      const hasDonation = document.querySelector('input[name="hasDonation"]:checked')?.value || 'No';
      const donationDetails = document.getElementById('donationDetails')?.value.trim() || 'None specified';
      
      const volunteerField = document.querySelector('input[name="volunteerField"]:checked')?.value || 'No';
      
      // Selected Field Skills Checkboxes
      const selectedSkills = [];
      document.querySelectorAll('input[name="fieldSkills"]:checked').forEach(cb => {
        selectedSkills.push(cb.value);
      });
      const fieldInterestsText = selectedSkills.length > 0 ? selectedSkills.join(', ') : 'General Volunteer Support';

      // Validation
      if (!fullName || !phone || !reason) {
        showToast('Please fill in your Full Name, Phone Number, and Reason for joining.', 'error');
        return;
      }

      // Construct formatted WhatsApp message
      let message = `*NEW MEMBER / VOLUNTEER REGISTRATION*\n`;
      message += `*Dreyson Global Foundation (DGF)*\n`;
      message += `------------------------------------\n`;
      message += `👤 *Name:* ${fullName}\n`;
      message += `📞 *Phone:* ${phone}\n`;
      message += `✉️ *Email:* ${email}\n`;
      message += `📍 *Location:* ${location}\n\n`;
      
      message += `💬 *Why I Want to Join DGF:*\n${reason}\n\n`;
      
      message += `📦 *Has Items/Things to Donate:* ${hasDonation}\n`;
      if (hasDonation === 'Yes') {
        message += `   Details: ${donationDetails}\n`;
      }
      
      message += `\n🤝 *Volunteer for Field Work:* ${volunteerField}\n`;
      if (volunteerField === 'Yes') {
        message += `   Interests: ${fieldInterestsText}\n`;
      }
      
      message += `------------------------------------\n`;
      message += `Sent from DGF Website (CM Building, Gowon Estate, Lagos)`;

      const targetNumber = '2349056068122'; // WhatsApp number 09056068122
      const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;

      // Show success feedback modal / toast
      showToast('Opening WhatsApp to send your application to DGF team...', 'success');

      // Open WhatsApp chat in new window
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 1000);
    });
  }
});
