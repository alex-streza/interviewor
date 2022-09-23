import { motion } from 'framer-motion'

const item = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  show: {
    opacity: 1,
    y: 0,
  },
}

const LiveBlocks = () => {
  return (
    <motion.svg
      variants={item}
      width="152"
      height="36"
      viewBox="0 0 152 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.655762" width="36" height="36" rx="12" fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.4502 10.64H6.66943L11.4639 15.792V22.9067L23.4502 10.64ZM13.8612 25.36H30.642L25.8475 20.208V13.0933L13.8612 25.36Z"
        fill="url(#paint0_radial_60_371)"
      />
      <path
        d="M45.8202 13.255V5.203H47.0082L47.0742 6.028C47.3015 5.72 47.5802 5.489 47.9102 5.335C48.2402 5.181 48.5959 5.104 48.9772 5.104C49.3732 5.104 49.7289 5.17733 50.0442 5.324C50.3595 5.46333 50.6272 5.66133 50.8472 5.918C51.0745 6.17467 51.2432 6.48633 51.3532 6.853C51.4705 7.21233 51.5292 7.623 51.5292 8.085C51.5292 8.51767 51.4742 8.91733 51.3642 9.284C51.2542 9.65067 51.0892 9.96967 50.8692 10.241C50.6565 10.505 50.3889 10.7103 50.0662 10.857C49.7509 11.0037 49.3805 11.077 48.9552 11.077C48.5885 11.077 48.2402 11.022 47.9102 10.912C47.5875 10.7947 47.3089 10.615 47.0742 10.373V13.255H45.8202ZM48.7132 9.988C48.9845 9.988 49.2192 9.94033 49.4172 9.845C49.6152 9.74233 49.7765 9.60667 49.9012 9.438C50.0332 9.26933 50.1285 9.07133 50.1872 8.844C50.2532 8.61667 50.2862 8.371 50.2862 8.107C50.2862 7.843 50.2532 7.59733 50.1872 7.37C50.1285 7.13533 50.0332 6.93367 49.9012 6.765C49.7765 6.59633 49.6115 6.46433 49.4062 6.369C49.2082 6.27367 48.9699 6.226 48.6912 6.226C48.4199 6.226 48.1852 6.27733 47.9872 6.38C47.7892 6.48267 47.6205 6.61833 47.4812 6.787C47.3419 6.95567 47.2355 7.15733 47.1622 7.392C47.0962 7.61933 47.0632 7.854 47.0632 8.096C47.0632 8.63133 47.2025 9.07867 47.4812 9.438C47.7599 9.79733 48.1705 9.98067 48.7132 9.988ZM55.2807 5.104C55.7427 5.104 56.1497 5.17733 56.5017 5.324C56.8537 5.47067 57.1507 5.676 57.3927 5.94C57.642 6.19667 57.829 6.50833 57.9537 6.875C58.0784 7.24167 58.1407 7.64867 58.1407 8.096C58.1407 8.55067 58.0784 8.96133 57.9537 9.328C57.8364 9.68733 57.6567 9.999 57.4147 10.263C57.1727 10.527 56.872 10.7287 56.5127 10.868C56.1607 11.0073 55.75 11.077 55.2807 11.077C54.8187 11.077 54.4117 11.0073 54.0597 10.868C53.7077 10.7213 53.4107 10.5197 53.1687 10.263C52.934 9.999 52.7544 9.68367 52.6297 9.317C52.5124 8.95033 52.4537 8.54333 52.4537 8.096C52.4537 7.64867 52.5124 7.24167 52.6297 6.875C52.7544 6.50833 52.9377 6.19667 53.1797 5.94C53.4217 5.676 53.7187 5.47067 54.0707 5.324C54.4227 5.17733 54.826 5.104 55.2807 5.104ZM55.2807 9.988C55.5667 9.988 55.8087 9.94033 56.0067 9.845C56.212 9.74233 56.377 9.60667 56.5017 9.438C56.6337 9.26933 56.729 9.07133 56.7877 8.844C56.8537 8.61667 56.8867 8.371 56.8867 8.107C56.8867 7.843 56.8537 7.59733 56.7877 7.37C56.729 7.13533 56.6337 6.93367 56.5017 6.765C56.377 6.59633 56.212 6.46433 56.0067 6.369C55.8087 6.27367 55.5667 6.226 55.2807 6.226C55.002 6.226 54.7637 6.27367 54.5657 6.369C54.3677 6.46433 54.2027 6.59633 54.0707 6.765C53.9387 6.93367 53.8397 7.13533 53.7737 7.37C53.715 7.59733 53.6857 7.843 53.6857 8.107C53.6857 8.371 53.715 8.61667 53.7737 8.844C53.8397 9.07133 53.935 9.26933 54.0597 9.438C54.1917 9.60667 54.3567 9.74233 54.5547 9.845C54.76 9.94033 55.002 9.988 55.2807 9.988ZM58.6751 5.203H60.0611L61.2711 9.669L62.5801 5.203H63.9881L65.2971 9.669L66.5071 5.203H67.8491L66.0451 11H64.5711L63.2621 6.732L61.9861 11H60.4681L58.6751 5.203ZM69.6384 8.525C69.653 8.73767 69.697 8.93567 69.7704 9.119C69.8437 9.30233 69.9427 9.46367 70.0674 9.603C70.1994 9.735 70.357 9.84133 70.5404 9.922C70.731 10.0027 70.951 10.043 71.2004 10.043C71.4644 10.043 71.7064 9.99533 71.9264 9.9C72.1464 9.80467 72.3077 9.63967 72.4104 9.405H73.6974C73.624 9.69833 73.503 9.95133 73.3344 10.164C73.173 10.3767 72.9787 10.5527 72.7514 10.692C72.5314 10.824 72.2857 10.923 72.0144 10.989C71.7504 11.0477 71.468 11.077 71.1674 11.077C70.7054 11.077 70.2984 11.0073 69.9464 10.868C69.6017 10.7287 69.312 10.527 69.0774 10.263C68.8427 9.999 68.6667 9.68733 68.5494 9.328C68.4394 8.96133 68.3844 8.55067 68.3844 8.096C68.3844 7.656 68.4467 7.25633 68.5714 6.897C68.696 6.53033 68.8757 6.215 69.1104 5.951C69.3524 5.687 69.642 5.48167 69.9794 5.335C70.3167 5.181 70.7017 5.104 71.1344 5.104C71.589 5.104 71.9814 5.181 72.3114 5.335C72.6414 5.48167 72.9164 5.68333 73.1364 5.94C73.3637 6.19667 73.5324 6.49733 73.6424 6.842C73.7524 7.18667 73.8074 7.56067 73.8074 7.964C73.8074 8.15467 73.7964 8.34167 73.7744 8.525H69.6384ZM72.5864 7.579C72.5717 7.139 72.4324 6.798 72.1684 6.556C71.9044 6.314 71.5634 6.193 71.1454 6.193C70.9107 6.193 70.7054 6.22967 70.5294 6.303C70.3534 6.37633 70.203 6.47533 70.0784 6.6C69.961 6.72467 69.8657 6.87133 69.7924 7.04C69.719 7.20867 69.6714 7.38833 69.6494 7.579H72.5864ZM74.9423 11V5.203H76.1193L76.1853 6.028C76.6326 5.412 77.2413 5.104 78.0113 5.104C78.0846 5.104 78.1543 5.10767 78.2203 5.115C78.2936 5.115 78.3596 5.11867 78.4183 5.126V6.292C78.3303 6.292 78.2423 6.29567 78.1543 6.303C78.0736 6.303 77.9929 6.303 77.9123 6.303C77.5896 6.31033 77.3183 6.369 77.0983 6.479C76.8856 6.58167 76.7096 6.721 76.5703 6.897C76.4383 7.073 76.3429 7.282 76.2843 7.524C76.2256 7.75867 76.1963 8.01167 76.1963 8.283V11H74.9423ZM80.155 8.525C80.1696 8.73767 80.2136 8.93567 80.287 9.119C80.3603 9.30233 80.4593 9.46367 80.584 9.603C80.716 9.735 80.8736 9.84133 81.057 9.922C81.2476 10.0027 81.4676 10.043 81.717 10.043C81.981 10.043 82.223 9.99533 82.443 9.9C82.663 9.80467 82.8243 9.63967 82.927 9.405H84.214C84.1406 9.69833 84.0196 9.95133 83.851 10.164C83.6896 10.3767 83.4953 10.5527 83.268 10.692C83.048 10.824 82.8023 10.923 82.531 10.989C82.267 11.0477 81.9846 11.077 81.684 11.077C81.222 11.077 80.815 11.0073 80.463 10.868C80.1183 10.7287 79.8286 10.527 79.594 10.263C79.3593 9.999 79.1833 9.68733 79.066 9.328C78.956 8.96133 78.901 8.55067 78.901 8.096C78.901 7.656 78.9633 7.25633 79.088 6.897C79.2126 6.53033 79.3923 6.215 79.627 5.951C79.869 5.687 80.1586 5.48167 80.496 5.335C80.8333 5.181 81.2183 5.104 81.651 5.104C82.1056 5.104 82.498 5.181 82.828 5.335C83.158 5.48167 83.433 5.68333 83.653 5.94C83.8803 6.19667 84.049 6.49733 84.159 6.842C84.269 7.18667 84.324 7.56067 84.324 7.964C84.324 8.15467 84.313 8.34167 84.291 8.525H80.155ZM83.103 7.579C83.0883 7.139 82.949 6.798 82.685 6.556C82.421 6.314 82.08 6.193 81.662 6.193C81.4273 6.193 81.222 6.22967 81.046 6.303C80.87 6.37633 80.7196 6.47533 80.595 6.6C80.4776 6.72467 80.3823 6.87133 80.309 7.04C80.2356 7.20867 80.188 7.38833 80.166 7.579H83.103ZM90.9479 11H89.7709L89.7049 10.197C89.4922 10.505 89.2245 10.725 88.9019 10.857C88.5792 10.989 88.2162 11.0623 87.8129 11.077C87.3655 11.0697 86.9805 10.989 86.6579 10.835C86.3352 10.6737 86.0675 10.461 85.8549 10.197C85.6422 9.92567 85.4845 9.614 85.3819 9.262C85.2865 8.91 85.2389 8.536 85.2389 8.14C85.2389 7.70733 85.2939 7.30767 85.4039 6.941C85.5212 6.57433 85.6935 6.25533 85.9209 5.984C86.1482 5.71267 86.4269 5.5 86.7569 5.346C87.0869 5.18467 87.4719 5.104 87.9119 5.104C88.2272 5.104 88.5462 5.15533 88.8689 5.258C89.1915 5.36067 89.4665 5.55133 89.6939 5.83V3.223H90.9479V11ZM88.0549 6.237C87.7762 6.237 87.5379 6.28467 87.3399 6.38C87.1419 6.47533 86.9769 6.60733 86.8449 6.776C86.7202 6.94467 86.6285 7.14633 86.5699 7.381C86.5112 7.60833 86.4819 7.854 86.4819 8.118C86.4819 8.382 86.5112 8.62767 86.5699 8.855C86.6285 9.08233 86.7202 9.28033 86.8449 9.449C86.9769 9.61767 87.1419 9.75333 87.3399 9.856C87.5452 9.95133 87.7909 9.999 88.0769 9.999C88.3482 9.999 88.5829 9.94767 88.7809 9.845C88.9862 9.735 89.1549 9.592 89.2869 9.416C89.4262 9.24 89.5289 9.03833 89.5949 8.811C89.6609 8.58367 89.6939 8.349 89.6939 8.107C89.6939 7.85033 89.6609 7.60833 89.5949 7.381C89.5362 7.15367 89.4409 6.95933 89.3089 6.798C89.1769 6.62933 89.0082 6.49733 88.8029 6.402C88.5975 6.29933 88.3482 6.24433 88.0549 6.237ZM95.2772 11V3.223H96.5312V6.017C96.7439 5.72367 97.0225 5.5 97.3672 5.346C97.7192 5.18467 98.0749 5.104 98.4342 5.104C98.8375 5.104 99.1969 5.17733 99.5122 5.324C99.8275 5.46333 100.095 5.665 100.315 5.929C100.535 6.18567 100.7 6.49733 100.81 6.864C100.928 7.22333 100.986 7.63033 100.986 8.085C100.986 8.503 100.935 8.89533 100.832 9.262C100.73 9.62133 100.572 9.93667 100.359 10.208C100.147 10.4793 99.8789 10.692 99.5562 10.846C99.2409 11 98.8669 11.077 98.4342 11.077C97.6055 11.077 96.9712 10.8093 96.5312 10.274C96.5239 10.3987 96.5165 10.5197 96.5092 10.637C96.5092 10.7543 96.5092 10.8753 96.5092 11H95.2772ZM98.1702 9.988C98.4415 9.988 98.6762 9.94033 98.8742 9.845C99.0722 9.74233 99.2335 9.60667 99.3582 9.438C99.4902 9.26933 99.5855 9.07133 99.6442 8.844C99.7102 8.61667 99.7432 8.371 99.7432 8.107C99.7432 7.843 99.7102 7.59733 99.6442 7.37C99.5855 7.13533 99.4902 6.93367 99.3582 6.765C99.2335 6.59633 99.0685 6.46433 98.8632 6.369C98.6652 6.27367 98.4269 6.226 98.1482 6.226C97.8622 6.226 97.6165 6.281 97.4112 6.391C97.2132 6.501 97.0482 6.64767 96.9162 6.831C96.7842 7.007 96.6852 7.20867 96.6192 7.436C96.5532 7.66333 96.5202 7.89067 96.5202 8.118C96.5202 8.36733 96.5532 8.60567 96.6192 8.833C96.6852 9.053 96.7842 9.24733 96.9162 9.416C97.0482 9.58467 97.2169 9.724 97.4222 9.834C97.6275 9.93667 97.8769 9.988 98.1702 9.988ZM107.488 5.203V10.076C107.488 10.406 107.48 10.7433 107.466 11.088C107.458 11.4327 107.4 11.77 107.29 12.1C107.121 12.628 106.817 13.0423 106.377 13.343C105.937 13.6437 105.346 13.794 104.606 13.794C104.166 13.794 103.74 13.7353 103.33 13.618C102.926 13.5007 102.545 13.3063 102.186 13.035C102.266 12.8663 102.343 12.6903 102.417 12.507C102.497 12.331 102.578 12.155 102.659 11.979C102.901 12.1697 103.176 12.331 103.484 12.463C103.799 12.595 104.158 12.661 104.562 12.661C104.95 12.661 105.255 12.595 105.475 12.463C105.695 12.331 105.86 12.1513 105.97 11.924C106.087 11.704 106.16 11.4473 106.19 11.154C106.226 10.868 106.245 10.5747 106.245 10.274C106.039 10.5673 105.783 10.7763 105.475 10.901C105.174 11.0257 104.833 11.088 104.452 11.088C104.019 11.088 103.649 11.022 103.341 10.89C103.033 10.758 102.791 10.5747 102.615 10.34C102.439 10.1053 102.314 9.82667 102.241 9.504C102.167 9.18133 102.131 8.82933 102.131 8.448V5.203H103.374V8.206C103.374 8.44067 103.388 8.668 103.418 8.888C103.454 9.10067 103.52 9.29133 103.616 9.46C103.718 9.62133 103.858 9.75333 104.034 9.856C104.21 9.95133 104.441 9.999 104.727 9.999C105.02 9.999 105.262 9.94033 105.453 9.823C105.651 9.70567 105.805 9.55533 105.915 9.372C106.032 9.18133 106.113 8.965 106.157 8.723C106.208 8.481 106.234 8.23167 106.234 7.975V5.203H107.488Z"
        fill="#2E2E2E"
      />
      <path
        d="M44.6558 18.6496H47.927V34.8896H44.6558V18.6496ZM51.8538 18C52.3951 18 52.8436 18.1779 53.1994 18.5336C53.5551 18.8739 53.733 19.3069 53.733 19.8328C53.733 20.3587 53.5551 20.7995 53.1994 21.1552C52.8436 21.5109 52.3951 21.6888 51.8538 21.6888C51.3124 21.6888 50.8562 21.5109 50.485 21.1552C50.1292 20.7995 49.9514 20.3587 49.9514 19.8328C49.9514 19.3069 50.1292 18.8739 50.485 18.5336C50.8562 18.1779 51.3124 18 51.8538 18ZM50.2066 22.9648H53.4778V34.8896H50.2066V22.9648ZM54.5974 22.9648H58.1006L60.9774 31.5488L63.8078 22.9648H67.2414L62.9494 34.8896H58.8894L54.5974 22.9648ZM67.4145 28.9504C67.4145 27.7131 67.6619 26.6381 68.1569 25.7256C68.6673 24.7976 69.371 24.0861 70.2681 23.5912C71.1806 23.0808 72.2323 22.8256 73.4233 22.8256C74.6297 22.8256 75.6891 23.0653 76.6017 23.5448C77.5297 24.0088 78.2489 24.6739 78.7593 25.54C79.2851 26.3907 79.5558 27.396 79.5713 28.556C79.5713 28.9736 79.5403 29.3448 79.4785 29.6696H70.8249V29.7624C70.9022 30.6285 71.1806 31.3091 71.6601 31.804C72.1395 32.2989 72.7969 32.5464 73.6321 32.5464C74.2971 32.5464 74.8462 32.4072 75.2793 32.1288C75.7278 31.8349 76.0217 31.4096 76.1609 30.8528H79.3857C79.2619 31.6416 78.9603 32.3531 78.4809 32.9872C78.0014 33.6213 77.3673 34.124 76.5785 34.4952C75.7897 34.8509 74.8849 35.0288 73.8641 35.0288C72.5339 35.0288 71.3817 34.7813 70.4073 34.2864C69.4483 33.7915 68.7059 33.0877 68.1801 32.1752C67.6697 31.2472 67.4145 30.1723 67.4145 28.9504ZM76.3001 27.5352C76.1918 26.8083 75.8902 26.2515 75.3953 25.8648C74.9158 25.4627 74.3049 25.2616 73.5625 25.2616C72.851 25.2616 72.2478 25.4704 71.7529 25.888C71.2734 26.2901 70.9873 26.8392 70.8945 27.5352H76.3001ZM88.2261 22.8256C89.2933 22.8256 90.2445 23.0731 91.0797 23.568C91.9149 24.0475 92.5645 24.7512 93.0285 25.6792C93.508 26.5917 93.7477 27.6667 93.7477 28.904C93.7477 30.1104 93.508 31.1776 93.0285 32.1056C92.5645 33.0336 91.9149 33.7528 91.0797 34.2632C90.2445 34.7736 89.3011 35.0288 88.2493 35.0288C87.4141 35.0288 86.6872 34.8741 86.0685 34.5648C85.4499 34.24 84.9395 33.8069 84.5373 33.2656L84.2125 34.8896H81.3589V18.6496H84.6301V24.4728C85.5427 23.3747 86.7413 22.8256 88.2261 22.8256ZM87.4837 32.3608C88.3653 32.3608 89.0768 32.0437 89.6181 31.4096C90.1595 30.7755 90.4301 29.948 90.4301 28.9272C90.4301 27.9064 90.1595 27.0789 89.6181 26.4448C89.0768 25.8107 88.3653 25.4936 87.4837 25.4936C86.6021 25.4936 85.8984 25.8107 85.3725 26.4448C84.8467 27.0635 84.5837 27.8832 84.5837 28.904C84.5837 29.9403 84.8467 30.7755 85.3725 31.4096C85.8984 32.0437 86.6021 32.3608 87.4837 32.3608ZM95.5644 18.6496H98.8356V34.8896H95.5644V18.6496ZM106.938 35.0288C105.686 35.0288 104.58 34.7813 103.621 34.2864C102.677 33.776 101.943 33.0568 101.417 32.1288C100.906 31.2008 100.651 30.1336 100.651 28.9272C100.651 27.7208 100.906 26.6536 101.417 25.7256C101.943 24.7976 102.677 24.0861 103.621 23.5912C104.58 23.0808 105.686 22.8256 106.938 22.8256C108.191 22.8256 109.289 23.0808 110.233 23.5912C111.192 24.0861 111.926 24.7976 112.437 25.7256C112.963 26.6536 113.226 27.7208 113.226 28.9272C113.226 30.1491 112.963 31.224 112.437 32.152C111.926 33.0645 111.192 33.776 110.233 34.2864C109.289 34.7813 108.191 35.0288 106.938 35.0288ZM106.938 32.3608C107.851 32.3608 108.57 32.0437 109.096 31.4096C109.637 30.7755 109.908 29.948 109.908 28.9272C109.908 27.9064 109.637 27.0789 109.096 26.4448C108.57 25.8107 107.851 25.4936 106.938 25.4936C106.041 25.4936 105.322 25.8107 104.781 26.4448C104.255 27.0789 103.992 27.9064 103.992 28.9272C103.992 29.948 104.255 30.7755 104.781 31.4096C105.322 32.0437 106.041 32.3608 106.938 32.3608ZM126.487 30.3656C126.27 31.8195 125.652 32.964 124.631 33.7992C123.626 34.6189 122.319 35.0288 120.71 35.0288C119.473 35.0288 118.39 34.7813 117.462 34.2864C116.534 33.776 115.815 33.0568 115.304 32.1288C114.81 31.2008 114.562 30.1336 114.562 28.9272C114.562 27.7053 114.81 26.6381 115.304 25.7256C115.815 24.7976 116.534 24.0861 117.462 23.5912C118.406 23.0808 119.496 22.8256 120.733 22.8256C122.326 22.8256 123.626 23.2355 124.631 24.0552C125.636 24.8595 126.255 25.9808 126.487 27.4192H123.1C122.961 26.8315 122.682 26.3675 122.265 26.0272C121.847 25.6715 121.329 25.4936 120.71 25.4936C119.859 25.4936 119.179 25.8107 118.668 26.4448C118.158 27.0789 117.903 27.9064 117.903 28.9272C117.903 29.948 118.158 30.7755 118.668 31.4096C119.179 32.0437 119.859 32.3608 120.71 32.3608C121.344 32.3608 121.87 32.1829 122.288 31.8272C122.721 31.4715 122.999 30.9843 123.123 30.3656H126.487ZM128.257 18.6496H131.529V28.0456L136.215 22.9648H139.881L135.635 27.628L140.113 34.8896H136.331L133.315 30.064L131.529 31.9896V34.8896H128.257V18.6496ZM143.364 30.9224C143.41 31.4483 143.665 31.8736 144.129 32.1984C144.593 32.5232 145.189 32.6856 145.916 32.6856C146.612 32.6856 147.161 32.5773 147.563 32.3608C147.965 32.1288 148.166 31.804 148.166 31.3864C148.166 31.0771 148.073 30.8451 147.888 30.6904C147.702 30.5357 147.439 30.4275 147.099 30.3656C146.759 30.2883 146.202 30.2032 145.428 30.1104C144.377 29.9712 143.503 29.7933 142.807 29.5768C142.111 29.3603 141.554 29.02 141.136 28.556C140.719 28.092 140.51 27.4733 140.51 26.7C140.51 25.9267 140.719 25.2461 141.136 24.6584C141.57 24.0552 142.173 23.5912 142.946 23.2664C143.719 22.9416 144.609 22.7792 145.614 22.7792C147.238 22.7947 148.545 23.1427 149.535 23.8232C150.54 24.5037 151.082 25.4472 151.159 26.6536H148.05C148.004 26.2051 147.764 25.8416 147.331 25.5632C146.913 25.2693 146.372 25.1224 145.707 25.1224C145.088 25.1224 144.586 25.2384 144.199 25.4704C143.828 25.7024 143.642 26.0117 143.642 26.3984C143.642 26.6768 143.743 26.8856 143.944 27.0248C144.145 27.164 144.408 27.2645 144.732 27.3264C145.057 27.3883 145.599 27.4579 146.356 27.5352C147.965 27.7208 149.195 28.0688 150.045 28.5792C150.911 29.0741 151.344 29.9325 151.344 31.1544C151.344 31.9277 151.112 32.6083 150.648 33.196C150.2 33.7837 149.566 34.24 148.746 34.5648C147.942 34.8741 147.006 35.0288 145.939 35.0288C144.284 35.0288 142.938 34.6653 141.902 33.9384C140.866 33.196 140.317 32.1907 140.255 30.9224H143.364Z"
        fill="black"
      />
      <defs>
        <radialGradient
          id="paint0_radial_60_371"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(3.31616 6.96001) rotate(32.1415) scale(29.9743 23.5122)"
        >
          <stop stopColor="#FF0099" />
          <stop offset="1" stopColor="#FF7A00" />
        </radialGradient>
      </defs>
    </motion.svg>
  )
}

export default LiveBlocks
