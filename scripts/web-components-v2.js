
// —————————————————————————image dialog modal Web Component—————————————————————————


class DialogImage extends HTMLElement {
  connectedCallback() {
    let img = this.querySelector('img');

    if(!img) {
        console.warn('dialog-image: No image found. Exiting.');
        return;
    }

    let parent = img.parentNode;
    if(parent.nodeName !== 'A') {
        console.warn('dialog-image: Image not wrapped in link. Exiting.');
        return;            
    }

    let fullImageLink = parent.href;
    let dialog = document.createElement('dialog');
    let description = (img.getAttribute('title') || '');
    let altText = (img.getAttribute('alt') || '');

    dialog.innerHTML = `
    <form method="dialog">
      <img id="dialogImage" src="${fullImageLink}" alt="${altText}" loading="lazy">
      <p id="dialogDescription">${description}</p>
      <footer>
        <button id="prev" type="button">&lt; Previous</button>
        <button type="submit">Close</button>
        <button id="next" type="button">Next &gt;</button>
      </footer>
    </form>
    `;
    parent.parentNode.insertBefore(dialog, parent.nextSibling);

    let nextButton = dialog.querySelector('#next');
    let prevButton = dialog.querySelector('#prev');

    // Check if there are dialog-image siblings before or after the current one
    let nextDialogImage = this.nextElementSibling;
    let prevDialogImage = this.previousElementSibling;


    // Add event listeners to the Next and Previous buttons to open the next/previous dialog and close the current dialog, but only if there is a next/previous dialog-image sibling and it's not been hidden by a filter
    nextButton.addEventListener('click', () => {
      if (nextDialogImage instanceof DialogImage && !nextDialogImage.hidden) {
        dialog.close();
        nextDialogImage.showDialog();
      }
    });

    prevButton.addEventListener('click', () => {
      if (prevDialogImage instanceof DialogImage && !prevDialogImage.hidden) {
        dialog.close();
        prevDialogImage.showDialog();
      }
    });

    // Add event listener to the Close button to set the width and check for next/previous images
    img.addEventListener('click', e => {
      e.preventDefault();
      dialog.showModal();

      // Check if there are dialog-image siblings before or after the current one
      let nextDialogImage = this.nextElementSibling;
      let prevDialogImage = this.previousElementSibling;

      // Check if there is a next image and it's not been hidden by a filter
      if (nextDialogImage instanceof DialogImage && !nextDialogImage.hidden) {
        nextButton.disabled = false;
      } else {
        nextButton.disabled = true;
        nextButton.title = "Sorry, you've reached the end of the gallery";
      }

      // Check if there is a previous image and it's not been hidden by a filter
      if (prevDialogImage instanceof DialogImage && !prevDialogImage.hidden) {
        prevButton.disabled = false;
      } else {
        prevButton.disabled = true;
        prevButton.title = "Sorry, you're at the start of the gallery";
      }

      let dialogImage = dialog.querySelector('#dialogImage');
      let dialogDescription = dialog.querySelector('#dialogDescription');
      dialogImage.onload = function() {
          dialogDescription.style.maxWidth = this.naturalWidth + 'px';
      };
  });
  }

  showDialog() {
    let img = this.querySelector('img');
    if (img) img.click();
  }
}

if(!customElements.get('dialog-image')) customElements.define('dialog-image', DialogImage);


// —————————————————————————feedback Web Component—————————————————————————
	

class Feedback extends HTMLElement {
  
  // connect component
  connectedCallback() {
    this.innerHTML = `
    
    <div>
    <img alt="The article author's avatar" src="data:image/webp;base64,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">
    <p>
      Have a question? Get in touch via <a href="https://twitter.com/dbs_sticky" title="My Twitter profile" target="_blank">X</a> or <a href="https://mastodon.social/@DBSSticky#" title="My Mastodon profile" target="_blank">Mastodon</a>.
      </p>
    </div>
    <a href="https://notbyai.fyi">    
      <svg width="131" height="42" viewBox="0 0 131 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.5 0.5H116C124.008 0.5 130.5 6.99187 130.5 15V41.5H15C6.99187 41.5 0.5 35.0081 0.5 27V0.5Z" fill="white" stroke="black"/>
      <path d="M17.9605 24.1575C21.4266 26.9643 26.3836 26.9643 29.8497 24.1575L28.5095 22.5026C25.8248 24.6766 21.9854 24.6766 19.3007 22.5026L17.9605 24.1575Z" fill="black"/>
      <path d="M19.404 20.5134V17.6365H21.5336V20.5134H19.404Z" fill="black"/>
      <path d="M26.012 17.6365V20.5134H28.1415V17.6365H26.012Z" fill="black"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M35 21.5C35 27.8513 29.8513 33 23.5 33C17.1487 33 12 27.8513 12 21.5C12 15.1487 17.1487 10 23.5 10C29.8513 10 35 15.1487 35 21.5ZM32.8705 21.5C32.8705 26.6752 28.6752 30.8705 23.5 30.8705C18.3248 30.8705 14.1295 26.6752 14.1295 21.5C14.1295 16.3248 18.3248 12.1295 23.5 12.1295C28.6752 12.1295 32.8705 16.3248 32.8705 21.5Z" fill="black"/>
      <path d="M48.2896 22.1781C49.2796 22.1781 50.088 22.4414 50.7148 22.9681C51.3474 23.4889 51.6638 24.356 51.6638 25.5692V32.0851H49.098V26.1995C49.098 25.6905 49.0307 25.2999 48.8959 25.0277C48.6499 24.5305 48.1813 24.282 47.49 24.282C46.6407 24.282 46.0578 24.646 45.7415 25.3739C45.5775 25.7586 45.4954 26.2498 45.4954 26.8475V32.0851H43V22.4266H45.4164V23.8381C45.7385 23.341 46.0432 22.9829 46.3302 22.764C46.8457 22.3734 47.4988 22.1781 48.2896 22.1781Z" fill="black"/>
      <path d="M57.5604 30.3008C58.2926 30.3008 58.855 30.0374 59.2475 29.5107C59.6399 28.984 59.8362 28.2353 59.8362 27.2648C59.8362 26.2942 59.6399 25.5485 59.2475 25.0277C58.855 24.501 58.2926 24.2376 57.5604 24.2376C56.8282 24.2376 56.2629 24.501 55.8646 25.0277C55.4721 25.5485 55.2758 26.2942 55.2758 27.2648C55.2758 28.2353 55.4721 28.984 55.8646 29.5107C56.2629 30.0374 56.8282 30.3008 57.5604 30.3008ZM62.4634 27.2648C62.4634 28.6851 62.0592 29.9013 61.2509 30.9133C60.4425 31.9194 59.2152 32.4225 57.5692 32.4225C55.9231 32.4225 54.6959 31.9194 53.8875 30.9133C53.0791 29.9013 52.675 28.6851 52.675 27.2648C52.675 25.8681 53.0791 24.6578 53.8875 23.6339C54.6959 22.6101 55.9231 22.0982 57.5692 22.0982C59.2152 22.0982 60.4425 22.6101 61.2509 23.6339C62.0592 24.6578 62.4634 25.8681 62.4634 27.2648Z" fill="black"/>
      <path d="M62.5608 24.2997V22.4977H63.8964V19.799H66.3742V22.4977H67.9295V24.2997H66.3742V29.4131C66.3742 29.8096 66.424 30.0581 66.5236 30.1587C66.6232 30.2534 66.9278 30.3008 67.4374 30.3008C67.5136 30.3008 67.5927 30.3008 67.6747 30.3008C67.7626 30.2949 67.8475 30.2889 67.9295 30.283V32.1739L66.7433 32.2183C65.56 32.2597 64.7516 32.0526 64.3181 31.5969C64.037 31.3069 63.8964 30.8601 63.8964 30.2564V24.2997H62.5608Z" fill="black"/>
      <path d="M77.602 22.1958C78.8615 22.1958 79.8456 22.6545 80.5544 23.5718C81.2691 24.4891 81.6264 25.6728 81.6264 27.1227C81.6264 28.6259 81.2749 29.8717 80.572 30.8601C79.869 31.8484 78.8878 32.3426 77.6284 32.3426C76.8376 32.3426 76.202 32.1828 75.7217 31.8632C75.4346 31.6738 75.1242 31.3424 74.7903 30.8689V32.0851H72.3388V19.0178H74.8342V23.6695C75.1505 23.2197 75.4991 22.8764 75.8798 22.6397C76.3309 22.3438 76.905 22.1958 77.602 22.1958ZM76.9606 30.2564C77.605 30.2564 78.1058 29.993 78.4631 29.4663C78.8205 28.9396 78.9991 28.2472 78.9991 27.389C78.9991 26.7025 78.9113 26.1344 78.7355 25.6846C78.4016 24.8324 77.7866 24.4063 76.8903 24.4063C75.9823 24.4063 75.3585 24.8235 75.0187 25.658C74.843 26.1018 74.7551 26.6759 74.7551 27.3802C74.7551 28.2087 74.9367 28.8952 75.2999 29.4397C75.6631 29.9842 76.2167 30.2564 76.9606 30.2564Z" fill="black"/>
      <path d="M83.0945 33.9405L83.4108 33.9582C83.6568 33.9701 83.8912 33.9612 84.1137 33.9316C84.3363 33.902 84.5238 33.8339 84.6761 33.7274C84.8225 33.6268 84.9573 33.4167 85.0803 33.0971C85.2092 32.7775 85.2619 32.5822 85.2385 32.5112L81.7237 22.4089H84.5092L86.6004 29.5462L88.5774 22.4089H91.2398L87.9536 31.9253C87.3209 33.76 86.8201 34.8963 86.451 35.3342C86.082 35.7781 85.3439 36 84.2368 36C84.0142 36 83.8355 35.997 83.7008 35.9911C83.566 35.9911 83.3639 35.9822 83.0945 35.9645V33.9405Z" fill="black"/>
      <path d="M97.783 27.1405H101.069L99.4525 21.9916L97.783 27.1405ZM97.95 19H101.008L105.594 32.0851H102.66L101.825 29.3953H97.0537L96.1575 32.0851H93.3281L97.95 19Z" fill="black"/>
      <path d="M110.59 32.0851H107.902V19H110.59V32.0851Z" fill="black"/>
      <path d="M106.306 19H112V21.2258H106.306V19Z" fill="black"/>
      <path d="M106.306 29.8624H112V32.0882H106.306V29.8624Z" fill="black"/>
      <path d="M42.9754 9.89597L43.9953 13.8667L45.0301 9.89597H46.0303L47.07 13.8432L48.1544 9.89597H49.0456L47.5058 14.9347H46.5799L45.5005 11.0345L44.4558 14.9347H43.5299L42 9.89597H42.9754Z" fill="black"/>
      <path d="M49.8156 9.89597H50.6622V10.7663C50.7316 10.597 50.9016 10.3915 51.1722 10.15C51.4429 9.90538 51.7548 9.78306 52.108 9.78306C52.1245 9.78306 52.1526 9.78463 52.1922 9.78777C52.2318 9.7909 52.2994 9.79718 52.3952 9.80659V10.7005C52.3424 10.6911 52.2928 10.6848 52.2466 10.6817C52.2037 10.6785 52.1559 10.6769 52.1031 10.6769C51.6541 10.6769 51.3092 10.815 51.0682 11.091C50.8273 11.3638 50.7068 11.679 50.7068 12.0366V14.9347H49.8156V9.89597Z" fill="black"/>
      <path d="M53.0662 9.9195H53.9722V14.9347H53.0662V9.9195ZM53.0662 8.02352H53.9722V8.98327H53.0662V8.02352Z" fill="black"/>
      <path d="M55.4008 8.48928H56.3019V9.89597H57.1485V10.5876H56.3019V13.8761C56.3019 14.0518 56.3646 14.1694 56.49 14.229C56.5593 14.2635 56.6749 14.2807 56.8366 14.2807C56.8795 14.2807 56.9257 14.2807 56.9752 14.2807C57.0248 14.2776 57.0825 14.2729 57.1485 14.2666V14.9347C57.0462 14.9629 56.9389 14.9833 56.8267 14.9958C56.7178 15.0084 56.599 15.0146 56.4702 15.0146C56.0543 15.0146 55.7721 14.9143 55.6236 14.7135C55.475 14.5097 55.4008 14.2462 55.4008 13.9232V10.5876H54.6828V9.89597H55.4008V8.48928Z" fill="black"/>
      <path d="M58.1215 8.48928H59.0227V9.89597H59.8693V10.5876H59.0227V13.8761C59.0227 14.0518 59.0854 14.1694 59.2108 14.229C59.2801 14.2635 59.3957 14.2807 59.5574 14.2807C59.6003 14.2807 59.6465 14.2807 59.696 14.2807C59.7455 14.2776 59.8033 14.2729 59.8693 14.2666V14.9347C59.767 14.9629 59.6597 14.9833 59.5475 14.9958C59.4386 15.0084 59.3197 15.0146 59.191 15.0146C58.7751 15.0146 58.4929 14.9143 58.3444 14.7135C58.1958 14.5097 58.1215 14.2462 58.1215 13.9232V10.5876H57.4036V9.89597H58.1215V8.48928Z" fill="black"/>
      <path d="M62.8723 9.78306C63.2486 9.78306 63.6134 9.86775 63.9666 10.0371C64.3197 10.2033 64.5888 10.4198 64.7736 10.6864C64.9518 10.9404 65.0707 11.2368 65.1301 11.5755C65.1829 11.8076 65.2093 12.1777 65.2093 12.6858H61.3226C61.3391 13.1971 61.4662 13.6079 61.7039 13.9185C61.9415 14.2258 62.3095 14.3795 62.808 14.3795C63.2734 14.3795 63.6447 14.2337 63.922 13.942C64.0804 13.7726 64.1927 13.5766 64.2587 13.3539H65.135C65.1119 13.5389 65.0344 13.7459 64.9023 13.9749C64.7736 14.2007 64.6284 14.3858 64.4666 14.5301C64.196 14.781 63.8609 14.9503 63.4615 15.0382C63.247 15.0883 63.0044 15.1134 62.7337 15.1134C62.0735 15.1134 61.5141 14.886 61.0552 14.4313C60.5964 13.9733 60.367 13.3335 60.367 12.5118C60.367 11.7026 60.5981 11.0455 61.0602 10.5405C61.5223 10.0355 62.1264 9.78306 62.8723 9.78306ZM64.2933 12.0131C64.257 11.6461 64.1729 11.3528 64.0408 11.1333C63.7966 10.7256 63.3889 10.5217 62.8179 10.5217C62.4086 10.5217 62.0653 10.6628 61.788 10.9451C61.5108 11.2243 61.3639 11.5802 61.3474 12.0131H64.2933Z" fill="black"/>
      <path d="M66.2071 9.89597H67.0537V10.6111C67.3046 10.3163 67.5703 10.1045 67.8509 9.97595C68.1315 9.84736 68.4434 9.78306 68.7867 9.78306C69.5392 9.78306 70.0476 10.0324 70.3116 10.5311C70.4569 10.804 70.5295 11.1945 70.5295 11.7026V14.9347H69.6234V11.759C69.6234 11.4516 69.5756 11.2039 69.4798 11.0157C69.3214 10.702 69.0342 10.5452 68.6183 10.5452C68.4071 10.5452 68.2338 10.5656 68.0984 10.6064C67.8542 10.6754 67.6396 10.8134 67.4548 11.0204C67.3062 11.1866 67.2089 11.3591 67.1627 11.5379C67.1198 11.7135 67.0983 11.966 67.0983 12.2953V14.9347H66.2071V9.89597Z" fill="black"/>
      <path d="M74.4015 8H75.268V10.5076C75.4628 10.2661 75.6955 10.0826 75.9661 9.95714C76.2368 9.82854 76.5306 9.76424 76.8474 9.76424C77.5076 9.76424 78.0423 9.98066 78.4516 10.4135C78.8642 10.8432 79.0705 11.4783 79.0705 12.3189C79.0705 13.1155 78.8675 13.7773 78.4615 14.3042C78.0555 14.8312 77.4927 15.0946 76.7732 15.0946C76.3705 15.0946 76.0305 15.0021 75.7532 14.817C75.5882 14.7073 75.4116 14.5316 75.2234 14.2901V14.9347H74.4015V8ZM76.7187 14.3466C77.2006 14.3466 77.5604 14.1647 77.7981 13.8008C78.039 13.437 78.1595 12.9571 78.1595 12.3612C78.1595 11.8312 78.039 11.3921 77.7981 11.0439C77.5604 10.6958 77.2089 10.5217 76.7435 10.5217C76.3375 10.5217 75.981 10.6644 75.674 10.9498C75.3703 11.2352 75.2185 11.7057 75.2185 12.3612C75.2185 12.8348 75.2812 13.219 75.4066 13.5139C75.641 14.069 76.0784 14.3466 76.7187 14.3466Z" fill="black"/>
      <path d="M83.3262 9.89597H84.3115C84.1861 10.219 83.9071 10.9561 83.4747 12.1072C83.1513 12.9728 82.8806 13.6785 82.6627 14.2243C82.1478 15.5102 81.7847 16.2943 81.5735 16.5766C81.3622 16.8589 80.9991 17 80.4842 17C80.3588 17 80.2614 16.9953 80.1921 16.9859C80.1261 16.9765 80.0435 16.9592 79.9445 16.9341V16.1626C80.0997 16.2033 80.2119 16.2284 80.2812 16.2378C80.3505 16.2473 80.4116 16.252 80.4644 16.252C80.6294 16.252 80.7499 16.2253 80.8258 16.172C80.9051 16.1218 80.9711 16.0591 81.0239 15.9838C81.0404 15.9587 81.0998 15.8301 81.2021 15.598C81.3045 15.3659 81.3787 15.1934 81.4249 15.0805L79.4643 9.89597H80.4743L81.8953 13.9984L83.3262 9.89597Z" fill="black"/>
      <path d="M87.7033 8H88.5945V10.5781C88.8057 10.3241 88.9955 10.1453 89.1639 10.0418C89.4511 9.86304 89.8092 9.77365 90.2383 9.77365C91.0074 9.77365 91.5289 10.0293 91.8029 10.5405C91.9514 10.8197 92.0257 11.207 92.0257 11.7026V14.9347H91.1097V11.759C91.1097 11.3889 91.0602 11.1176 90.9612 10.9451C90.7994 10.6691 90.4958 10.5311 90.0502 10.5311C89.6805 10.5311 89.3454 10.6519 89.0451 10.8934C88.7447 11.1349 88.5945 11.5912 88.5945 12.2624V14.9347H87.7033V8Z" fill="black"/>
      <path d="M94.1375 9.89597V13.241C94.1375 13.4982 94.1804 13.7083 94.2662 13.8714C94.4246 14.1725 94.7201 14.3231 95.1525 14.3231C95.773 14.3231 96.1955 14.0596 96.42 13.5327C96.5421 13.2504 96.6032 12.863 96.6032 12.3706V9.89597H97.4944V14.9347H96.6527L96.6626 14.1913C96.5471 14.3826 96.4035 14.5442 96.2318 14.6759C95.8919 14.9394 95.4793 15.0711 94.994 15.0711C94.2381 15.0711 93.7232 14.8312 93.4493 14.3513C93.3007 14.0941 93.2265 13.7507 93.2265 13.321V9.89597H94.1375Z" fill="black"/>
      <path d="M98.7892 9.89597H99.6706V10.6111C99.8818 10.3633 100.073 10.183 100.245 10.07C100.539 9.87872 100.872 9.78306 101.245 9.78306C101.668 9.78306 102.008 9.88186 102.265 10.0795C102.41 10.1924 102.542 10.3586 102.661 10.5781C102.859 10.3084 103.092 10.1093 103.359 9.98066C103.627 9.84893 103.927 9.78306 104.26 9.78306C104.973 9.78306 105.459 10.0277 105.716 10.517C105.855 10.7804 105.924 11.1349 105.924 11.5802V14.9347H104.998V11.4344C104.998 11.0988 104.909 10.8683 104.731 10.7428C104.556 10.6174 104.341 10.5546 104.087 10.5546C103.737 10.5546 103.435 10.666 103.181 10.8887C102.93 11.1113 102.805 11.483 102.805 12.0037V14.9347H101.899V11.6461C101.899 11.3042 101.856 11.0549 101.77 10.8981C101.635 10.6628 101.382 10.5452 101.012 10.5452C100.676 10.5452 100.369 10.6691 100.091 10.9169C99.8174 11.1647 99.6805 11.6132 99.6805 12.2624V14.9347H98.7892V9.89597Z" fill="black"/>
      <path d="M107.818 13.5938C107.818 13.8385 107.912 14.0314 108.1 14.1725C108.288 14.3136 108.511 14.3842 108.769 14.3842C109.082 14.3842 109.386 14.3152 109.68 14.1772C110.175 13.9482 110.422 13.5734 110.422 13.0528V12.3706C110.313 12.4365 110.173 12.4914 110.001 12.5353C109.83 12.5792 109.661 12.6106 109.496 12.6294L108.957 12.6952C108.633 12.736 108.391 12.8003 108.229 12.8881C107.955 13.0355 107.818 13.2708 107.818 13.5938ZM109.977 11.8813C110.181 11.8562 110.318 11.7747 110.388 11.6367C110.427 11.5614 110.447 11.4532 110.447 11.3121C110.447 11.0235 110.338 10.815 110.12 10.6864C109.906 10.5546 109.597 10.4888 109.194 10.4888C108.729 10.4888 108.399 10.6079 108.204 10.8463C108.095 10.978 108.024 11.1741 107.991 11.4344H107.159C107.176 10.8134 107.387 10.3821 107.793 10.1406C108.202 9.89598 108.676 9.77365 109.214 9.77365C109.838 9.77365 110.345 9.88657 110.734 10.1124C111.12 10.3382 111.313 10.6895 111.313 11.1662V14.069C111.313 14.1568 111.332 14.2274 111.368 14.2807C111.408 14.334 111.488 14.3607 111.611 14.3607C111.65 14.3607 111.695 14.3591 111.744 14.356C111.794 14.3497 111.847 14.3419 111.903 14.3325V14.9582C111.764 14.9958 111.658 15.0193 111.586 15.0288C111.513 15.0382 111.414 15.0429 111.289 15.0429C110.982 15.0429 110.759 14.9394 110.62 14.7324C110.548 14.6226 110.496 14.4673 110.467 14.2666C110.285 14.4924 110.024 14.6884 109.684 14.8547C109.345 15.0209 108.97 15.104 108.561 15.104C108.069 15.104 107.666 14.9629 107.352 14.6806C107.042 14.3952 106.887 14.0392 106.887 13.6127C106.887 13.1453 107.041 12.7831 107.348 12.5259C107.654 12.2687 108.057 12.1103 108.556 12.0507L109.977 11.8813Z" fill="black"/>
      <path d="M112.678 9.89597H113.524V10.6111C113.775 10.3163 114.041 10.1045 114.321 9.97595C114.602 9.84736 114.914 9.78306 115.257 9.78306C116.01 9.78306 116.518 10.0324 116.782 10.5311C116.927 10.804 117 11.1945 117 11.7026V14.9347H116.094V11.759C116.094 11.4516 116.046 11.2039 115.95 11.0157C115.792 10.702 115.505 10.5452 115.089 10.5452C114.878 10.5452 114.704 10.5656 114.569 10.6064C114.325 10.6754 114.11 10.8134 113.925 11.0204C113.777 11.1866 113.679 11.3591 113.633 11.5379C113.59 11.7135 113.569 11.966 113.569 12.2953V14.9347H112.678V9.89597Z" fill="black"/>
      </svg>
    </a>
  `;
  }
}

// register component
if(!customElements.get('feedback-contact')) customElements.define('feedback-contact', Feedback);


// —————————————————————————social links Web Component—————————————————————————
	

class Social extends HTMLElement {

  // connect component
  connectedCallback() {

    // Get the title and URL from the Open Graph tags.
    let ogTitleTag = document.querySelector("meta[property=\"og:title\"]");
    let ogUrlTag = document.querySelector("meta[property=\"og:url\"]");
    
    // If the Open Graph tags are present, use them. Otherwise, use the document title and URL.
    let ogTitle = ogTitleTag ? ogTitleTag.content : document.title;
    let ogUrl = ogUrlTag ? ogUrlTag.content : window.location.href;

    // Convert the title and URL to URIs.
    let titleUri = encodeURIComponent(ogTitle);
    let urlUri = encodeURIComponent(ogUrl)

    const style = `
    <style>
      social-icons {
      a {all: unset;}
        & div {
          height: 35px;
            & svg {
              cursor: pointer;
              transition: all 0.4s ease-in-out;
              width: 35px;
              fill: var(--accent);
                &:hover {
                  transform: scale(1.3);
                }
            }        
        }
      }
    </style>
    `;

    // Concatenate the titleURI and UrlUri together into the intent links for each network.
    const template = `
    <div>

      <a href='https://bsky.app/intent/compose?text=${titleUri}%20${urlUri}' target='_blank' title='Share this article on BlueSky'>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m7 9.12a16.6 16.6 0 0 0-3.83-5.04c-1.12-.89-2.94-1.57-2.94.61a45 45 0 0 0 .38 4.17c.48 1.81 2.24 2.28 3.81 2-2.73.49-3.43 2.11-1.93 3.73 2.85 3.08 4.1-.77 4.42-1.76.06-.18.09-.27.09-.2 0-.07.03.02.09.2.32.99 1.57 4.84 4.42 1.76 1.5-1.63.81-3.24-1.92-3.73 1.56.28 3.32-.19 3.8-2 .14-.52.38-3.74.38-4.18 0-2.17-1.82-1.48-2.94-.6A16.6 16.6 0 0 0 12 12.12" />
        </svg>
      </a>

      <a href='http://reddit.com/submit?url=${urlUri}&title=${titleUri}' target='_blank' title='Share this article on Reddit'>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.919 14.87a.184.184 0 0 1 0 .262c-.399.397-1.024.59-1.912.59L12 15.72l-.007.002c-.889 0-1.513-.193-1.912-.59a.184.184 0 0 1 0-.262.187.187 0 0 1 .264 0c.324.324.864.481 1.649.481l.007.001.007-.001c.784 0 1.323-.158 1.649-.48a.184.184 0 0 1 .261 0m-.095-2.86a.79.79 0 0 0-.79.787.79.79 0 0 0 1.581 0 .79.79 0 0 0-.791-.787m-2.854.787a.79.79 0 0 0-1.582 0 .79.79 0 0 0 .791.787c.436 0 .79-.352.79-.787M21 5v14c0 1-1 2-2 2H5c-1 0-2-1-2-2V5c0-1 1-2 2-2h14c1 0 2 1 2 2m-3 6.89a1.328 1.328 0 0 0-2.25-.95c-.905-.596-2.13-.975-3.485-1.024l.742-2.334 2.008.47-.003.03a1.086 1.086 0 0 0 2.173 0 1.085 1.085 0 0 0-2.096-.392l-2.165-.507a.184.184 0 0 0-.22.124l-.827 2.604c-1.419.017-2.705.399-3.65 1.012A1.322 1.322 0 0 0 6 11.89c0 .485.266.905.659 1.135a2.4 2.4 0 0 0-.043.43c0 1.954 2.404 3.545 5.36 3.545 2.955 0 5.359-1.59 5.359-3.546q-.002-.205-.038-.405a1.32 1.32 0 0 0 .703-1.16" />
        </svg>
      </a>

      <a href='https://www.facebook.com/sharer/sharer.php?u=${urlUri}' target='_blank' title='Share this article on Facebook'>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3H5C4 3 3 4 3 5v14c0 1 1 2 2 2h7.615v-6.97h-2.346v-2.717h2.346V9.31c0-2.325 1.42-3.591 3.494-3.591.994 0 1.847.074 2.096.107v2.43h-1.438c-1.128 0-1.346.537-1.346 1.323v1.735h2.69l-.35 2.716h-2.34V21H19c1 0 2-1 2-2V5c0-1-1-2-2-2" />
        </svg>
      </a>

      <a href='https://x.com/intent/tweet?url=${urlUri}&text=${titleUri}' target='_blank' title='Share this article on X'>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.099 21h13.803A2.1 2.1 0 0 0 21 18.901V5.1c0-1.161-.94-2.1-2.099-2.1H5.1C3.939 3 3 3.94 3 5.099v13.803A2.1 2.1 0 0 0 5.099 21m5.504-8.395L5.765 6.136h3.729l3.172 4.24 3.925-4.24h1.096l-4.532 4.896 5.11 6.832h-3.728l-3.444-4.605-4.262 4.605H5.735zM9.09 6.943H7.377l7.564 10.114h1.713z" />
        </svg>
      </a>

      <a href='http://www.linkedin.com/shareArticle?mini=true&url=${urlUri}&title=${titleUri}' target='_blank' title='Share this article on LinkedIn'>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2M9 17H6.5v-7H9zM7.7 8.7c-.8 0-1.3-.5-1.3-1.2S7 6.3 7.8 6.3s1.3.5 1.3 1.2-.5 1.2-1.4 1.2M18 17h-2.4v-3.8c0-1-.7-1.3-1-1.3s-1 .1-1 1.3V17h-2.5v-7h2.5v1c.3-.6 1-1 2.2-1s2.2 1 2.2 3.2z" />
        </svg>
      </a>

      <a href='mailto:?subject=${titleUri}&body=${urlUri}' target='_blank' title='Share this article on Email'>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7.488v11.49c0 1.135.921 2.056 2.057 2.056h13.92a2.057 2.057 0 0 0 2.057-2.057v-11.3l-8.892 6.73zm18.034-2.404L12 11.92 3 5.11v-.052C3 3.921 3.921 3 5.057 3h13.92c1.136 0 2.057.921 2.057 2.057z"/>
        </svg>
      </a>

      <a id="share-icon" title='Open native sharing menu'>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm9.4 3.422c.272-.226.616-.373.98-.417.096-.01.367-.003.47.013.524.085.965.371 1.235.799a1.624 1.624 0 0 1-.196 1.977 1.85 1.85 0 0 1-.99.534 1.4 1.4 0 0 1-.33.021c-.188 0-.23-.002-.322-.021a1.85 1.85 0 0 1-.773-.34c-.082-.064-.098-.072-.115-.064-.053.028-4.863 2.676-4.871 2.682-.006.005-.002.044.009.1.025.134.03.392.01.518l-.012.074-.01.059-.005.032 2.404 1.324 2.45 1.348.044.023.06-.047c.222-.177.51-.307.806-.366.094-.02.138-.022.325-.022s.231.003.328.022c.559.107 1.014.439 1.257.915.226.443.239.94.036 1.396a1.74 1.74 0 0 1-1.176.965 1.84 1.84 0 0 1-1.614-.37 1.72 1.72 0 0 1-.56-.94 1.2 1.2 0 0 1-.022-.314c0-.179.004-.226.022-.31a.4.4 0 0 0 .014-.104c-.004-.004-1.09-.602-2.413-1.33l-1.232-.678c-.71-.39-1.194-.657-1.204-.664l-.03-.018-.069.057a1.82 1.82 0 0 1-1.151.398 1.4 1.4 0 0 1-.31-.022c-.566-.109-1.02-.438-1.265-.916a1.6 1.6 0 0 1 .121-1.675 1.8 1.8 0 0 1 1.144-.715c.096-.017.143-.021.315-.021.171 0 .218.004.315.021.309.06.59.187.82.371.06.047.082.06.094.053l.526-.29 1.916-1.054c1.923-1.059 2.426-1.34 2.425-1.353l-.02-.107a1.4 1.4 0 0 1-.019-.296c0-.18.003-.22.023-.308.082-.37.284-.71.56-.94"/>
        </svg>
      </a>

    </div>
    `;

    // Set the innerHTML of the component to the style and template
    this.innerHTML = style + template;

    // Check if the browser supports the Web Share API, and hide the native sharing icon if not supported
    if (!navigator.canShare) {
      this.querySelector('#share-icon').style.display = 'none';
    } else {
    // Add event listener to share icon to trigger native sharing
    let shareButton = this.querySelector('#share-icon');
    shareButton.addEventListener("click", async () => {
      try {
        await navigator.share({ title: ogTitle, url: ogUrl });
        console.log("Data was shared successfully");
      } catch (err) {
        console.error("Share failed:", err.message);
      }
    });
    }

  }
}
  
// register component
if(!customElements.get('social-icons')) customElements.define('social-icons', Social);


// —————————————————————————byline Web Component—————————————————————————
	

class byline extends HTMLElement {

  connectedCallback() {
    // Get the date and change the formet.
    let ogDate = document.querySelector("meta[property=\"article:published_time\"]").content;
    let date = new Date(ogDate);
    let day = String(date.getDate()).padStart(2, '0');
    let month = date.toLocaleString('default', { month: 'short' });
    let year = date.getFullYear();
    let formattedDate = `${day} ${month} ${year}`;
  
    // calculate the reading time
    // Select all the <p> tags in the document.
    let pTags = document.querySelectorAll('p');
  
    // Calculate the total number of characters in these tags.
    let totalChars = 0;
    pTags.forEach(pTag => {
      totalChars += pTag.textContent.length;
    });
  
    // Assume an average reading speed of 1250 characters per minute.
    let readingSpeed = 1250;
  
    // Calculate the reading time in minutes.
    let readingTime = Math.ceil(totalChars / readingSpeed);

    // If the reading time is just 1 minute, then state "min", else "mins"
    let units = readingTime === 1 ? 'min' : 'mins';
  
    this.innerHTML = `

      <card-footer>
        <time datetime="${ogDate}">${formattedDate}</time>
        <article-duration> • ${readingTime} ${units} • </article-duration>
      </card-footer>
    `;
  }
}
  
// register component
if(!customElements.get('by-line')) customElements.define('by-line', byline);


// —————————————————————————Table of Contents Web Component—————————————————————————


class ToC extends HTMLElement {

  // connect component
  connectedCallback() {

    // Function to create an outline based on the specified element type
    function createOutline(elementType) {
      // Get all article elements
      const articles = document.querySelectorAll('article');
      // Initialize an empty array to store the elements of the specified type
      let elements = [];
      // Iterate over each article
      articles.forEach(article => {
        // Get all elements of the specified type within the current article
        const articleElements = article.querySelectorAll(elementType);
        // Add the elements to the elements array
        elements = [...elements, ...articleElements];
      });
      // If there are no elements of the specified type, return an empty string
      if (elements.length === 0) {
        return '';
      }
      // Initialize an empty array to store the outline
      const outline = [];

      // Iterate over each element
      elements.forEach((element, index) => {
        let text;
        // If the element type is "figure", get the text content of the figcaption element
        if (elementType === "figure") {
          const figcaption = element.querySelector("figcaption");
          text = figcaption ? figcaption.textContent : '';
        } else {
          // For other element types, get the text content of the element
          text = element.textContent;
        }
        // Generate a unique ID for the element
        const id = `${elementType}-${index}`;
        // Set the ID of the element
        element.id = id;
        // Add the text and ID to the outline array
        outline.push({text, id});
      });

      // Create a new unordered list element to hold the outline
      const contentList = document.createElement("ul");
      // Iterate over each item in the outline array
      outline.forEach( o => { 
        // Create a new list item element
        const li = document.createElement("li");
        // Create a new anchor element
        const a = document.createElement("a");
        // Set the href attribute of the anchor element to link to the corresponding element ID
        a.href = `#${o.id}`;
        // Set the title attribute of the anchor element to the trimmed text content
        a.title = o.text.trim();
        // Set the text content of the anchor element
        a.textContent = o.text;
        // Append the anchor element to the list item element
        li.appendChild(a);
        // Append the list item element to the content list
        contentList.appendChild(li);
      });

      // Return the content list
      return contentList.outerHTML;
    }

    // Function to create an outline for headings
    function createHeadingsOutline() {
      // Get the content list for headings
      const contentList = createOutline.call(this, "h2");
      // If the content list is not empty, set the innerHTML of the <table-of-contents> element
      if (contentList !== '') {
        this.innerHTML = '<div>Sections</div>' + contentList;
      }
    }

    // Function to create an outline for figures
    function createFiguresOutline() {
      // Get the content list for figures
      const contentList = createOutline.call(this, "figure");
      // If the content list is not empty, set the innerHTML of the <table-of-contents> element
      if (contentList !== '') {
        this.innerHTML += '<div>Figures</div>' + contentList;
      }
    }

    createHeadingsOutline.call(this);
    createFiguresOutline.call(this);
  }
}

// register component
if(!customElements.get('table-of-contents')) customElements.define('table-of-contents', ToC);


// —————————————————————————global nav Web Component—————————————————————————
	

class Nav extends HTMLElement {
  
  // connect component
  connectedCallback() {
    this.innerHTML = `
  <ul>
    <li><a href="../index.html" title="Homepage">home</a></li>
    <li><a href="../pages/subscribe.html" title="Subscribe via RSS">rss</a></li>
    <li><a href="../pages/changelog.html" title="View all website updates">changelog</a></li>
    <li><a href="../pages/about.html" title="Who made this site, and why?">about</a></li>
  </ul>
  `;
  }
}
// register component
if(!customElements.get('global-nav')) customElements.define('global-nav', Nav);