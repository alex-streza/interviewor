import Cards from '@components/cards/Cards'
import LiveBlocks from '@components/logo/LiveBlocks'
import {
  Button,
  Container,
  createStyles,
  Stack,
  Text,
  Title,
} from '@mantine/core'

import Separator from '@components/icons/separator.svg'
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import { Question } from 'src/types/models/questions'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import { container, item, MotionTitle } from '@utils/variants'

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.blue[0],
    paddingBlock: '40px',
    paddingInline: '0',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      paddingTop: '100px',
      overflow: 'visible',
    },
  },
  title: {
    fontSize: 32,
    lineHeight: 1.2,
    paddingInline: '20px',
    position: 'relative',
    maxWidth: 730,

    ':before': {
      display: 'inline-flex',
      zIndex: 1,
      content: "''",
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 31' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 25C8.63347 21.8346 16.4516 6.42665 21.8008 6.00771C27.1501 5.58876 31.2649 22.3932 38.0954 22.4863C44.926 22.5794 56.7766 6.61285 62.7842 6.5663C68.7918 6.51975 67.8866 22.207 74.1411 22.207C80.3956 22.207 93.316 6.61285 100.311 6.5663C107.306 6.51975 110.022 21.6019 116.112 21.9277C122.202 22.2536 129.609 8.47484 136.851 8.52139C144.093 8.56794 152.322 22.2536 159.564 22.207C166.806 22.1605 173.719 8.28864 180.303 8.24209C186.887 8.19554 191.413 22.0208 199.066 21.9277C206.72 21.8346 218.735 7.6835 226.224 7.6835C233.713 7.6835 241.037 19.5537 244 21.9277' stroke='url(%23paint0_linear_10_332)' stroke-opacity='0.72' stroke-width='11' stroke-linecap='round'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_10_332' x1='6' y1='6' x2='244' y2='6' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2300B4D8'/%3E%3Cstop offset='1' stop-color='%23ADE8F4'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%0A")`,
      backgroundRepeat: 'no-repeat',
      position: 'absolute',
      top: '29px',
      right: '25px',
      width: '130px',
      height: '15px',

      [`@media (min-width: ${theme.breakpoints.md}px)`]: {
        top: '54px',
        width: '248px',
        height: '28px',
      },
    },

    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      fontSize: 60,
    },
  },
  button: {
    position: 'relative',

    ':before': {
      display: 'inline-flex',
      content: "''",
      backgroundImage: `url("data:image/svg+xml, %3Csvg width='227' height='181' viewBox='0 0 227 181' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M403 103.328C389.824 106.049 264.99 183.234 244.613 176.432C224.235 169.631 202.019 139.023 201.407 119.299C200.794 99.5742 238.096 52.6691 233.5 35.5291C228.904 18.3891 201.877 6.39238 181.5 4.21587C161.123 2.03936 146.403 47.0659 118.671 45.0255C90.9395 42.985 22.5389 26.4048 4 19.6032' stroke='url(%23paint0_linear_62_379)' stroke-opacity='0.54' stroke-width='7' stroke-linecap='round' stroke-dasharray='11 18'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_62_379' x1='7.43799' y1='4.21594' x2='323.671' y2='4.21594' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2300B4D8'/%3E%3Cstop offset='1' stop-color='%23ADE8F4'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E")`,
      backgroundRepeat: 'no-repeat',
      position: 'absolute',
      top: '0px',
      right: '-220px',
      width: '227px',
      height: '181px',

      [`@media (min-width: ${theme.breakpoints.md}px)`]: {
        top: '0px',
        right: '-400px',
        width: '399px',
        height: '200px',
      },
    },
    ':after': {
      display: 'inline-flex',
      content: "''",
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='247' height='156' viewBox='0 0 247 156' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-191.227 1.24863C-192.308 -0.00683761 -194.202 -0.148111 -195.458 0.933082C-196.713 2.01428 -196.854 3.90851 -195.773 5.16397L-191.227 1.24863ZM44.5 81.4708L41.8065 80.1498L44.5 81.4708ZM12 53.2592L10.9984 50.4313L12 53.2592ZM-5 95.1216L-3.06447 92.8295L-5 95.1216ZM162.267 140.259L162.294 137.259L162.267 140.259ZM-191.947 9.96827C-190.948 11.2903 -189.067 11.5523 -187.745 10.5536C-186.423 9.55481 -186.161 7.67348 -187.16 6.35149L-191.947 9.96827ZM-179.651 16.7632C-180.602 15.4061 -182.472 15.0763 -183.829 16.0267C-185.187 16.977 -185.516 18.8477 -184.566 20.2049L-179.651 16.7632ZM-177.317 30.681C-176.379 32.0466 -174.511 32.3932 -173.146 31.4551C-171.78 30.5169 -171.433 28.6493 -172.371 27.2836L-177.317 30.681ZM-165.157 37.797C-166.095 36.4314 -167.963 36.0849 -169.328 37.0231C-170.694 37.9613 -171.04 39.8289 -170.102 41.1945L-165.157 37.797ZM-162.85 51.7031C-161.905 53.0641 -160.036 53.4014 -158.675 52.4565C-157.314 51.5116 -156.976 49.6423 -157.921 48.2813L-162.85 51.7031ZM-150.614 58.7179C-151.571 57.3649 -153.443 57.0433 -154.796 57.9997C-156.149 58.956 -156.47 60.8281 -155.514 62.1811L-150.614 58.7179ZM-148.079 72.5776C-147.107 73.9195 -145.231 74.2194 -143.89 73.2475C-142.548 72.2756 -142.248 70.3999 -143.22 69.058L-148.079 72.5776ZM-135.692 79.2967C-136.684 77.9694 -138.563 77.6975 -139.891 78.6892C-141.218 79.681 -141.49 81.5609 -140.498 82.8882L-135.692 79.2967ZM-132.741 93.0764C-131.725 94.3848 -129.84 94.6216 -128.532 93.6051C-127.223 92.5887 -126.986 90.704 -128.003 89.3955L-132.741 93.0764ZM-120.106 99.3262C-121.153 98.0421 -123.043 97.8501 -124.327 98.8972C-125.611 99.9443 -125.803 101.834 -124.756 103.118L-120.106 99.3262ZM-116.497 112.951C-115.411 114.203 -113.517 114.338 -112.265 113.252C-111.013 112.167 -110.878 110.272 -111.964 109.02L-116.497 112.951ZM-103.52 118.391C-104.655 117.183 -106.554 117.125 -107.761 118.259C-108.968 119.394 -109.027 121.292 -107.893 122.5L-103.52 118.391ZM-98.794 131.689C-97.5943 132.832 -95.6953 132.786 -94.5526 131.586C-93.4098 130.387 -93.4559 128.488 -94.6556 127.345L-98.794 131.689ZM-85.2798 135.622C-86.5687 134.581 -88.4575 134.782 -89.4986 136.071C-90.5396 137.36 -90.3387 139.249 -89.0497 140.29L-85.2798 135.622ZM-78.3626 147.897C-76.9466 148.758 -75.1013 148.307 -74.241 146.891C-73.3807 145.475 -73.8312 143.63 -75.2472 142.769L-78.3626 147.897ZM-64.3754 147.821C-65.962 147.344 -67.6351 148.244 -68.1122 149.83C-68.5893 151.417 -67.6899 153.09 -66.1032 153.567L-64.3754 147.821ZM-52.3766 155.035C-50.7206 154.98 -49.4221 153.594 -49.4763 151.938C-49.5306 150.282 -50.9169 148.984 -52.5729 149.038L-52.3766 155.035ZM-40.1575 147.394C-41.7731 147.762 -42.7853 149.369 -42.4181 150.985C-42.051 152.6 -40.4436 153.612 -38.8279 153.245L-40.1575 147.394ZM-25.8831 149.207C-24.3418 148.599 -23.5852 146.856 -24.1931 145.315C-24.801 143.774 -26.5433 143.017 -28.0846 143.625L-25.8831 149.207ZM-16.5466 138.213C-18.003 139.003 -18.5431 140.824 -17.753 142.28C-16.9629 143.736 -15.1418 144.277 -13.6855 143.486L-16.5466 138.213ZM-2.24136 136.496C-0.870804 135.565 -0.514481 133.7 -1.44547 132.329C-2.37646 130.959 -4.24223 130.602 -5.61279 131.533L-2.24136 136.496ZM4.69739 123.851C3.41133 124.896 3.21564 126.785 4.26027 128.071C5.3049 129.357 7.19429 129.553 8.48033 128.508L4.69739 123.851ZM18.5029 119.692C19.7038 118.55 19.7521 116.652 18.6107 115.451C17.4693 114.25 15.5704 114.201 14.3694 115.343L18.5029 119.692ZM23.3643 106.118C22.254 107.348 22.3509 109.245 23.5807 110.355C24.8105 111.465 26.7075 111.369 27.8178 110.139L23.3643 106.118ZM36.3591 99.8641C37.3623 98.5455 37.1067 96.6633 35.7881 95.66C34.4695 94.6568 32.5873 94.9124 31.5841 96.231L36.3591 99.8641ZM38.7868 85.6733C37.936 87.0951 38.3989 88.9373 39.8207 89.7881C41.2425 90.6388 43.0847 90.1759 43.9354 88.7541L38.7868 85.6733ZM49.8422 75.5429C50.2131 73.9281 49.2047 72.3184 47.5899 71.9475C45.9751 71.5766 44.3654 72.585 43.9945 74.1998L49.8422 75.5429ZM42.094 63.3522C43.1029 64.6665 44.9862 64.9141 46.3005 63.9052C47.6148 62.8964 47.8624 61.0131 46.8535 59.6988L42.094 63.3522ZM33.688 51.2497C32.1083 50.7499 30.4226 51.6253 29.9228 53.205C29.423 54.7847 30.2984 56.4704 31.8781 56.9702L33.688 51.2497ZM18.9978 55.1939C20.654 55.1469 21.9585 53.7662 21.9115 52.11C21.8645 50.4538 20.4838 49.1493 18.8276 49.1963L18.9978 55.1939ZM6.12352 52.2456C4.58301 52.8555 3.82863 54.5988 4.43855 56.1393C5.04848 57.6798 6.79175 58.4342 8.33226 57.8242L6.12352 52.2456ZM-0.560699 61.955C0.889542 61.1538 1.41568 59.3286 0.614456 57.8784C-0.186783 56.4281 -2.01195 55.902 -3.46219 56.7032L-0.560699 61.955ZM-12.3832 62.9695C-13.5975 64.0967 -13.6682 65.9949 -12.541 67.2092C-11.4138 68.4236 -9.51561 68.4942 -8.30127 67.3671L-12.3832 62.9695ZM-12.9788 74.3677C-12.5413 72.7697 -13.482 71.1195 -15.08 70.6819C-16.6781 70.2444 -18.3282 71.1851 -18.7658 72.7832L-12.9788 74.3677ZM-17.4826 84.7486C-16.7778 86.2481 -14.9909 86.8923 -13.4914 86.1875C-11.9919 85.4827 -11.3477 83.6958 -12.0525 82.1963L-17.4826 84.7486ZM-6.63739 89.5387C-7.79997 88.3581 -9.6994 88.3436 -10.8799 89.5062C-12.0604 90.6687 -12.075 92.5682 -10.9124 93.7487L-6.63739 89.5387ZM-1.73387 101.357C-0.368378 102.295 1.4993 101.949 2.4377 100.583C3.37611 99.2179 3.02989 97.3502 1.6644 96.4118L-1.73387 101.357ZM12.1167 102.606C10.6471 101.841 8.83546 102.412 8.07036 103.881C7.30527 105.351 7.87639 107.163 9.34601 107.928L12.1167 102.606ZM20.8967 113.369C22.4191 114.023 24.1832 113.319 24.8369 111.796C25.4905 110.274 24.7862 108.51 23.2637 107.856L20.8967 113.369ZM34.7403 112.416C33.1859 111.842 31.4608 112.637 30.8871 114.192C30.3135 115.746 31.1086 117.471 32.6629 118.045L34.7403 112.416ZM44.6117 122.175C46.1878 122.686 47.8797 121.823 48.3908 120.247C48.9018 118.671 48.0384 116.979 46.4623 116.468L44.6117 122.175ZM58.3463 120.1C56.7542 119.641 55.0916 120.56 54.6327 122.152C54.1738 123.744 55.0924 125.406 56.6844 125.865L58.3463 120.1ZM68.8515 129.182C70.456 129.595 72.0917 128.629 72.505 127.025C72.9182 125.42 71.9526 123.784 70.3481 123.371L68.8515 129.182ZM82.4416 126.317C80.8268 125.946 79.2168 126.953 78.8454 128.568C78.4741 130.183 79.482 131.793 81.0966 132.164L82.4416 126.317ZM93.4099 134.835C95.0333 135.166 96.6178 134.119 96.949 132.495C97.2802 130.872 96.2326 129.287 94.6092 128.956L93.4099 134.835ZM106.838 131.294C105.207 131.003 103.649 132.09 103.358 133.721C103.067 135.352 104.154 136.91 105.785 137.201L106.838 131.294ZM118.219 139.253C119.857 139.501 121.386 138.375 121.634 136.737C121.882 135.098 120.756 133.569 119.117 133.321L118.219 139.253ZM131.433 135.009C129.788 134.808 128.293 135.979 128.092 137.624C127.892 139.268 129.062 140.764 130.707 140.965L131.433 135.009ZM143.269 142.283C144.919 142.426 146.373 141.203 146.516 139.553C146.659 137.902 145.437 136.448 143.787 136.305L143.269 142.283ZM156.155 137.105C154.499 137.039 153.104 138.327 153.037 139.983C152.971 141.638 154.259 143.034 155.915 143.1L156.155 137.105ZM168.039 143.217C169.696 143.177 171.006 141.802 170.967 140.146C170.927 138.49 169.552 137.179 167.896 137.219L168.039 143.217ZM179 136.542C177.352 136.708 176.15 138.179 176.316 139.828C176.482 141.476 177.953 142.678 179.602 142.512L179 136.542ZM191.125 140.819C192.75 140.499 193.809 138.922 193.489 137.296C193.169 135.67 191.592 134.612 189.966 134.932L191.125 140.819ZM200.643 132.221C199.063 132.72 198.187 134.405 198.686 135.985C199.184 137.565 200.87 138.442 202.45 137.943L200.643 132.221ZM213.396 133.729C214.902 133.038 215.563 131.257 214.872 129.751C214.181 128.245 212.401 127.585 210.895 128.275L213.396 133.729ZM220.593 123.082C219.18 123.949 218.738 125.796 219.605 127.208C220.472 128.62 222.319 129.062 223.731 128.196L220.593 123.082ZM233.334 121.639C234.663 120.65 234.938 118.77 233.948 117.441C232.959 116.112 231.079 115.837 229.75 116.827L233.334 121.639ZM238.658 109.906C237.358 110.932 237.135 112.819 238.162 114.119C239.188 115.42 241.075 115.642 242.375 114.616L238.658 109.906ZM-195.773 5.16397C-194.677 6.43696 -193.399 8.04647 -191.947 9.96827L-187.16 6.35149C-188.652 4.37567 -190.015 2.6554 -191.227 1.24863L-195.773 5.16397ZM-184.566 20.2049C-182.329 23.3999 -179.905 26.9134 -177.317 30.681L-172.371 27.2836C-174.962 23.5125 -177.398 19.981 -179.651 16.7632L-184.566 20.2049ZM-170.102 41.1945C-167.773 44.5842 -165.351 48.1 -162.85 51.7031L-157.921 48.2813C-160.415 44.6894 -162.831 41.1824 -165.157 37.797L-170.102 41.1945ZM-155.514 62.1811C-153.089 65.6123 -150.607 69.0876 -148.079 72.5776L-143.22 69.058C-145.732 65.5894 -148.2 62.1331 -150.614 58.7179L-155.514 62.1811ZM-140.498 82.8882C-137.944 86.3062 -135.355 89.7115 -132.741 93.0764L-128.003 89.3955C-130.591 86.0634 -133.158 82.6882 -135.692 79.2967L-140.498 82.8882ZM-124.756 103.118C-122.017 106.477 -119.26 109.765 -116.497 112.951L-111.964 109.02C-114.683 105.885 -117.4 102.644 -120.106 99.3262L-124.756 103.118ZM-107.893 122.5C-104.853 125.734 -101.816 128.811 -98.794 131.689L-94.6556 127.345C-97.5861 124.553 -100.546 121.556 -103.52 118.391L-107.893 122.5ZM-89.0497 140.29C-85.4518 143.196 -81.8806 145.76 -78.3626 147.897L-75.2472 142.769C-78.4918 140.798 -81.8438 138.397 -85.2798 135.622L-89.0497 140.29ZM-66.1032 153.567C-63.803 154.259 -61.5167 154.713 -59.2577 154.887L-58.7961 148.905C-60.5694 148.768 -62.4297 148.406 -64.3754 147.821L-66.1032 153.567ZM-59.2577 154.887C-56.9654 155.064 -54.67 155.11 -52.3766 155.035L-52.5729 149.038C-54.6553 149.106 -56.7309 149.064 -58.7961 148.905L-59.2577 154.887ZM-38.8279 153.245C-34.4605 152.253 -30.1344 150.883 -25.8831 149.207L-28.0846 143.625C-32.0824 145.202 -36.1168 146.476 -40.1575 147.394L-38.8279 153.245ZM-13.6855 143.486C-9.77216 141.363 -5.94815 139.014 -2.24136 136.496L-5.61279 131.533C-9.16878 133.949 -12.8228 136.192 -16.5466 138.213L-13.6855 143.486ZM8.48033 128.508C11.9743 125.67 15.3248 122.712 18.5029 119.692L14.3694 115.343C11.2993 118.261 8.06549 121.115 4.69739 123.851L8.48033 128.508ZM27.8178 110.139C30.924 106.698 33.7847 103.248 36.3591 99.8641L31.5841 96.231C29.1152 99.4759 26.3623 102.797 23.3643 106.118L27.8178 110.139ZM43.9354 88.7541C45.1629 86.7028 46.2537 84.7081 47.1935 82.7919L41.8065 80.1498C40.9488 81.8985 39.9397 83.7466 38.7868 85.6733L43.9354 88.7541ZM47.1935 82.7919C48.4398 80.2509 49.3154 77.8364 49.8422 75.5429L43.9945 74.1998C43.5862 75.9773 42.8824 77.9563 41.8065 80.1498L47.1935 82.7919ZM46.8535 59.6988C43.6205 55.4871 38.6801 52.8291 33.688 51.2497L31.8781 56.9702C36.2324 58.3478 39.8901 60.4811 42.094 63.3522L46.8535 59.6988ZM18.8276 49.1963C15.8792 49.2799 13.1202 49.6799 10.9984 50.4313L13.0016 56.0871C14.3193 55.6204 16.3968 55.2677 18.9978 55.1939L18.8276 49.1963ZM10.9984 50.4313C9.72668 50.8818 8.03978 51.4869 6.12352 52.2456L8.33226 57.8242C10.1459 57.1062 11.7515 56.5298 13.0016 56.0871L10.9984 50.4313ZM-3.46219 56.7032C-6.57596 58.4235 -9.72488 60.502 -12.3832 62.9695L-8.30127 67.3671C-6.11644 65.339 -3.4133 63.531 -0.560699 61.955L-3.46219 56.7032ZM-18.7658 72.7832C-19.7824 76.496 -19.4684 80.5237 -17.4826 84.7486L-12.0525 82.1963C-13.4802 79.159 -13.5887 76.5952 -12.9788 74.3677L-18.7658 72.7832ZM-10.9124 93.7487C-9.72554 94.9539 -8.40219 96.1752 -6.93553 97.4137L-3.06447 92.8295C-4.40561 91.697 -5.59227 90.5999 -6.63739 89.5387L-10.9124 93.7487ZM-6.93553 97.4137C-5.34792 98.7544 -3.60773 100.069 -1.73387 101.357L1.6644 96.4118C-0.0698395 95.22 -1.64899 94.0248 -3.06447 92.8295L-6.93553 97.4137ZM9.34601 107.928C12.9336 109.796 16.802 111.611 20.8967 113.369L23.2637 107.856C19.2842 106.147 15.5527 104.395 12.1167 102.606L9.34601 107.928ZM32.6629 118.045C36.5182 119.468 40.5122 120.846 44.6117 122.175L46.4623 116.468C42.4321 115.161 38.5141 113.809 34.7403 112.416L32.6629 118.045ZM56.6844 125.865C60.6823 127.018 64.7469 128.124 68.8515 129.182L70.3481 123.371C66.2961 122.328 62.2867 121.236 58.3463 120.1L56.6844 125.865ZM81.0966 132.164C85.1954 133.107 89.3083 133.998 93.4099 134.835L94.6092 128.956C90.5556 128.129 86.4912 127.248 82.4416 126.317L81.0966 132.164ZM105.785 137.201C109.978 137.949 114.132 138.634 118.219 139.253L119.117 133.321C115.083 132.71 110.981 132.033 106.838 131.294L105.785 137.201ZM130.707 140.965C135.021 141.491 139.221 141.932 143.269 142.283L143.787 136.305C139.814 135.961 135.684 135.527 131.433 135.009L130.707 140.965ZM155.915 143.1C158.092 143.187 160.203 143.241 162.24 143.259L162.294 137.259C160.324 137.242 158.275 137.19 156.155 137.105L155.915 143.1ZM162.24 143.259C164.223 143.277 166.155 143.262 168.039 143.217L167.896 137.219C166.079 137.262 164.212 137.276 162.294 137.259L162.24 143.259ZM179.602 142.512C183.688 142.1 187.519 141.528 191.125 140.819L189.966 134.932C186.552 135.604 182.907 136.148 179 136.542L179.602 142.512ZM202.45 137.943C206.392 136.698 210.021 135.277 213.396 133.729L210.895 128.275C207.739 129.723 204.342 131.053 200.643 132.221L202.45 137.943ZM223.731 128.196C227.182 126.078 230.35 123.862 233.334 121.639L229.75 116.827C226.864 118.976 223.848 121.084 220.593 123.082L223.731 128.196ZM242.375 114.616C243.875 113.432 245.346 112.279 246.816 111.16L243.184 106.385C241.669 107.537 240.164 108.717 238.658 109.906L242.375 114.616Z' fill='url(%23paint0_linear_62_380)' fill-opacity='0.37'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_62_380' x1='-163' y1='10.9418' x2='255' y2='10.9418' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23ADE8F4'/%3E%3Cstop offset='1' stop-color='%2300B4D8'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E");	backgroundRepeat: "no-repeat",`,
      position: 'absolute',
      backgroundRepeat: 'no-repeat',
      transform: 'rotate(20deg)',
      top: '-130px',
      right: '140px',
      width: '227px',
      height: '181px',

      [`@media (min-width: ${theme.breakpoints.md}px)`]: {
        transform: 'rotate(0deg)',
        top: '-80px',
        right: '80px',
        width: '327px',
        height: '281px',
      },
    },
  },
  separator: {
    width: '100%',
    height: '60px',
    marginTop: '-10px',

    path: {
      strokeWidth: 15,
    },

    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      height: '60px',
      marginTop: '-30px',

      path: {
        strokeWidth: 5,
      },
    },
  },
  text: {
    marginTop: '8px',
    marginBottom: '40px',
  },
}))

interface HeroProps {
  questions: Question[]
  totalCount?: string
}

const Hero = ({ questions, totalCount }: HeroProps) => {
  const { classes } = useStyles()
  const controls = useAnimation()
  const [ref, inView] = useInView()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (inView) {
      controls.start('show')
    }
  }, [controls, inView])

  return (
    <motion.section
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={container}
      id="hero"
    >
      <Container className={classes.container} fluid>
        <MotionTitle
          order={1}
          align="center"
          variants={item}
          className={classes.title}
        >
          Imagine your perfect tech interview
        </MotionTitle>
        <motion.span variants={item}>
          <Text align="center" mt="xs" px="xs">
            Train & collaborate on over {totalCount} web development,
            theory-based questions and answers.
          </Text>
        </motion.span>
        <Stack align="center" mt="sm" spacing="sm">
          <Stack align="center" spacing="xxs">
            <Link href="/interview" passHref>
              <motion.div variants={item}>
                <Button size="lg" className={classes.button}>
                  Get started
                </Button>
              </motion.div>
            </Link>
            <motion.span variants={item}>
              <Text align="center" color="blue" size="sm">
                No account required
              </Text>
            </motion.span>
          </Stack>
          <Cards
            questions={questions}
            index={index}
            onNext={() => setIndex(index + 1)}
            onPrevious={() => setIndex(index - 1)}
            autoPlay
          />
          <LiveBlocks />
        </Stack>
      </Container>
      <motion.div variants={item} className={classes.separator}>
        <Separator />
      </motion.div>
    </motion.section>
  )
}

export default Hero
