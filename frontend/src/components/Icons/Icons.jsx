export const DropDownIcon = ({ width = '2.4rem', height = '2.4rem', className, color = 'white' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
    >
        <path
            d="M12.364 12.95L17.314 8L18.728 9.414L12.364 15.778L6.00003 9.414L7.41403 8L12.364 12.95Z"
            fill={color}
        />
    </svg>
);

export const DropDownRightIcon = ({ width = '2.4rem', height = '2.4rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M12.95 11.636L8 6.68597L9.414 5.27197L15.778 11.636L9.414 18L8 16.586L12.95 11.636Z"
                fill="black"
            />
        </svg>
    );
};
export const DropDownLeftIcon = ({ width = '2.4rem', height = '2.4rem', className, color = '#202224' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 24 24"
            fill="none"
        >
            <g opacity="0.6">
                <path d="M15.41 16.4064L10.83 12L15.41 7.59362L14 6.24002L8 12L14 17.76L15.41 16.4064Z" fill={color} />
            </g>
        </svg>
    );
};

export const UnderLine = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            width="100%"
            height="0.1rem"
            viewBox="0 0 48 1"
            fill="none"
            preserveAspectRatio="none"
        >
            <g opacity="0.5">
                <line y1="0.5" x2="48" y2="0.5" stroke="black" />
            </g>
        </svg>
    );
};

export const SearchIcon = ({ width = '2.4rem', height = '2.4rem', className }) => {
    return (
        <svg
            width={width}
            height={height}
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M20 20L16.2223 16.2156M18.3158 11.1579C18.3158 13.0563 17.5617 14.8769 16.2193 16.2193C14.8769 17.5617 13.0563 18.3158 11.1579 18.3158C9.2595 18.3158 7.43886 17.5617 6.0965 16.2193C4.75413 14.8769 4 13.0563 4 11.1579C4 9.2595 4.75413 7.43886 6.0965 6.0965C7.43886 4.75413 9.2595 4 11.1579 4C13.0563 4 14.8769 4.75413 16.2193 6.0965C17.5617 7.43886 18.3158 9.2595 18.3158 11.1579V11.1579Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
};

export const HeartIcon = ({ width = '3.2rem', height = '3.2rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 32 32"
            fill="none"
        >
            <path
                d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const CartIcon = ({ width = '3.2rem', height = '3.2rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 32 32"
            fill="none"
        >
            <path
                d="M11 27C11.5523 27 12 26.5523 12 26C12 25.4477 11.5523 25 11 25C10.4477 25 10 25.4477 10 26C10 26.5523 10.4477 27 11 27Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M25 27C25.5523 27 26 26.5523 26 26C26 25.4477 25.5523 25 25 25C24.4477 25 24 25.4477 24 26C24 26.5523 24.4477 27 25 27Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M3 5H7L10 22H26" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M10 16.6667H25.59C25.7056 16.6667 25.8177 16.6267 25.9072 16.5535C25.9966 16.4802 26.0579 16.3782 26.0806 16.2648L27.8806 7.26479C27.8951 7.19222 27.8934 7.11733 27.8755 7.04552C27.8575 6.97371 27.8239 6.90678 27.7769 6.84956C27.73 6.79234 27.6709 6.74625 27.604 6.71462C27.5371 6.68299 27.464 6.66661 27.39 6.66666H8"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const UserIcon = ({ width = '3.2rem', height = '3.2rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 32 32"
            fill="none"
        >
            <path
                d="M24 27V24.3333C24 22.9188 23.5224 21.5623 22.6722 20.5621C21.8221 19.5619 20.669 19 19.4667 19H11.5333C10.331 19 9.17795 19.5619 8.32778 20.5621C7.47762 21.5623 7 22.9188 7 24.3333V27"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M16.5 14C18.9853 14 21 11.9853 21 9.5C21 7.01472 18.9853 5 16.5 5C14.0147 5 12 7.01472 12 9.5C12 11.9853 14.0147 14 16.5 14Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const SendIcon = ({ width = '2.4rem', height = '2.4rem', className }) => {
    return (
        <svg
            width={width}
            height={height}
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9.91199 11.9998H3.99999L2.02299 4.1348C2.01033 4.0891 2.00262 4.04216 1.99999 3.9948C1.97799 3.2738 2.77199 2.7738 3.45999 3.1038L22 11.9998L3.45999 20.8958C2.77999 21.2228 1.99599 20.7368 1.99999 20.0288C2.00201 19.9655 2.01313 19.9029 2.03299 19.8428L3.49999 14.9998"
                stroke="#FAFAFA"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const FacebookIcon = ({ width = '2.4rem', height = '2.4rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M13 10H17.5L17 12H13V21H11V12H7V10H11V8.128C11 6.345 11.186 5.698 11.534 5.046C11.875 4.40181 12.4018 3.87501 13.046 3.534C13.698 3.186 14.345 3 16.128 3C16.65 3 17.108 3.05 17.5 3.15V5H16.128C14.804 5 14.401 5.078 13.99 5.298C13.686 5.46 13.46 5.686 13.298 5.99C13.078 6.401 13 6.804 13 8.128V10Z"
                fill="white"
            />
        </svg>
    );
};

export const TwitterIcon = ({ width = '2.3rem', height = '2.4rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 23 24"
            fill="none"
        >
            <path
                d="M12.905 8.84651L12.905 8.84646C12.9194 8.06035 13.2418 7.3113 13.8028 6.76049C14.3639 6.20969 15.1188 5.90116 15.905 5.90129L12.905 8.84651ZM12.905 8.84651L12.877 10.4213M12.905 8.84651L12.877 10.4213M4.75811 7.80857L4.89001 7.91846C6.76679 9.48211 8.71781 10.4182 10.7495 10.6952C10.7495 10.6952 10.7495 10.6952 10.7495 10.6952L12.3104 10.9072L4.75811 7.80857ZM4.75811 7.80857L4.72759 7.97751M4.75811 7.80857L4.72759 7.97751M4.72759 7.97751C4.42576 9.64819 4.5683 11.0709 5.1479 12.3018C5.72718 13.532 6.73827 14.5605 8.15577 15.4519L8.15579 15.452M4.72759 7.97751L8.15579 15.452M8.15579 15.452L9.90279 16.55L9.954 16.4685M8.15579 15.452L9.954 16.4685M9.954 16.4685L9.90279 16.55C9.97196 16.5934 10.0294 16.6532 10.0702 16.724C10.1109 16.7948 10.1337 16.8745 10.1365 16.9562C10.1392 17.0378 10.122 17.1189 10.0862 17.1924C10.0504 17.2658 9.99716 17.3294 9.93112 17.3775L9.93101 17.3775M9.954 16.4685L9.93101 17.3775M9.93101 17.3775L8.33901 18.5405L8.11542 18.7039M9.93101 17.3775L8.11542 18.7039M8.11542 18.7039L8.39178 18.7211M8.11542 18.7039L8.39178 18.7211M8.39178 18.7211C9.3449 18.7805 10.2529 18.7385 11.0095 18.5884L11.0096 18.5884M8.39178 18.7211L11.0096 18.5884M11.0096 18.5884C13.3886 18.1134 15.3745 16.9794 16.7652 15.2211M11.0096 18.5884L16.7652 15.2211M12.877 10.4213C12.8757 10.4918 12.8594 10.5612 12.8293 10.625C12.7993 10.6887 12.7561 10.7454 12.7026 10.7912C12.649 10.8371 12.5864 10.8712 12.5188 10.8911C12.4513 10.9111 12.3803 10.9166 12.3105 10.9072L12.877 10.4213ZM16.7652 15.2211C18.1557 13.463 18.945 11.0883 18.945 8.14229M16.7652 15.2211L18.945 8.14229M18.945 8.14229C18.945 7.99668 18.8714 7.78474 18.744 7.55722M18.945 8.14229L18.744 7.55722M18.744 7.55722C18.6142 7.32559 18.4215 7.06508 18.1673 6.82049M18.744 7.55722L18.1673 6.82049M18.1673 6.82049C17.6587 6.33088 16.8999 5.90129 15.905 5.90129L18.1673 6.82049ZM20.4978 5.53842C20.8818 5.48388 21.3285 5.34345 21.916 5.01105C21.6101 6.49526 21.4321 7.16764 20.7642 8.08336L20.745 8.10969V8.14229C20.745 11.9415 19.578 14.7567 17.8258 16.7397C16.0726 18.7238 13.7277 19.8813 11.3624 20.3532C9.74529 20.6759 7.7544 20.5728 5.99643 20.2106C5.11813 20.0296 4.30077 19.7846 3.61983 19.4974C3.03727 19.2517 2.56009 18.9775 2.22956 18.6904C2.66065 18.6482 3.4114 18.5535 4.24366 18.3598C5.24355 18.1272 6.37173 17.7494 7.20306 17.141L7.31918 17.056L7.19904 16.9768C7.15724 16.9492 7.11178 16.9196 7.06301 16.8879C6.30477 16.3938 4.74648 15.3786 3.73155 13.5166C2.66714 11.5637 2.19257 8.66295 3.91362 4.42592C5.57889 6.34347 7.2726 7.66001 8.99504 8.3668L8.99505 8.36681C9.57662 8.60536 9.94255 8.72373 10.2318 8.79141C10.4509 8.84265 10.6261 8.86463 10.8117 8.88794C10.8703 8.89529 10.93 8.90278 10.9924 8.91135L11.2872 8.95189L11.1059 8.77077C11.131 7.8414 11.4254 6.93895 11.9539 6.17331C12.4904 5.39606 13.2442 4.79434 14.1211 4.4435C14.9979 4.09265 15.9588 4.00828 16.8833 4.20093C17.8079 4.39359 18.6551 4.85471 19.3189 5.52657L19.3485 5.55658L19.3907 5.55628C19.4934 5.55556 19.5972 5.55908 19.7036 5.56269C19.9483 5.57098 20.2068 5.57974 20.4978 5.53842Z"
                fill="white"
                stroke="black"
                strokeWidth="0.2"
            />
        </svg>
    );
};

export const InstaIcon = ({ width = '2rem', height = '2rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 20 20"
            fill="none"
        >
            <path
                d="M15 1H5C3.93913 1 2.92172 1.42143 2.17157 2.17157C1.42143 2.92172 1 3.93913 1 5V15C1 16.0609 1.42143 17.0783 2.17157 17.8284C2.92172 18.5786 3.93913 19 5 19H15C16.0609 19 17.0783 18.5786 17.8284 17.8284C18.5786 17.0783 19 16.0609 19 15V5C19 3.93913 18.5786 2.92172 17.8284 2.17157C17.0783 1.42143 16.0609 1 15 1Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
            <path
                d="M10 14C11.0609 14 12.0783 13.5786 12.8284 12.8284C13.5786 12.0783 14 11.0609 14 10C14 8.93913 13.5786 7.92172 12.8284 7.17157C12.0783 6.42143 11.0609 6 10 6C8.93913 6 7.92172 6.42143 7.17157 7.17157C6.42143 7.92172 6 8.93913 6 10C6 11.0609 6.42143 12.0783 7.17157 12.8284C7.92172 13.5786 8.93913 14 10 14V14Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
            <path
                d="M15.5 5.5C15.7652 5.5 16.0196 5.39464 16.2071 5.20711C16.3946 5.01957 16.5 4.76522 16.5 4.5C16.5 4.23478 16.3946 3.98043 16.2071 3.79289C16.0196 3.60536 15.7652 3.5 15.5 3.5C15.2348 3.5 14.9804 3.60536 14.7929 3.79289C14.6054 3.98043 14.5 4.23478 14.5 4.5C14.5 4.76522 14.6054 5.01957 14.7929 5.20711C14.9804 5.39464 15.2348 5.5 15.5 5.5Z"
                fill="white"
            />
        </svg>
    );
};

export const LikendinIcon = ({ width = '2.4rem', height = '2.4rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M11.5 9.05C12.417 8.113 13.611 7.5 15 7.5C16.4587 7.5 17.8576 8.07946 18.8891 9.11091C19.9205 10.1424 20.5 11.5413 20.5 13V20.5H18.5V13C18.5 12.0717 18.1313 11.1815 17.4749 10.5251C16.8185 9.86875 15.9283 9.5 15 9.5C14.0717 9.5 13.1815 9.86875 12.5251 10.5251C11.8687 11.1815 11.5 12.0717 11.5 13V20.5H9.5V8H11.5V9.05ZM4.5 6C4.10218 6 3.72064 5.84196 3.43934 5.56066C3.15804 5.27936 3 4.89782 3 4.5C3 4.10218 3.15804 3.72064 3.43934 3.43934C3.72064 3.15804 4.10218 3 4.5 3C4.89782 3 5.27936 3.15804 5.56066 3.43934C5.84196 3.72064 6 4.10218 6 4.5C6 4.89782 5.84196 5.27936 5.56066 5.56066C5.27936 5.84196 4.89782 6 4.5 6ZM3.5 8H5.5V20.5H3.5V8Z"
                fill="white"
            />
        </svg>
    );
};

export const CopyRightIcon = ({ width = '1.9rem', height = '2rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 19 20"
            fill="none"
        >
            <path
                d="M9.50002 18.3332C14.1024 18.3332 17.8334 14.6022 17.8334 9.99984C17.8334 5.39746 14.1024 1.6665 9.50002 1.6665C4.89765 1.6665 1.16669 5.39746 1.16669 9.99984C1.16669 14.6022 4.89765 18.3332 9.50002 18.3332Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 8.14799C12 8.14799 10.9706 6.6665 9.25492 6.6665C7.53924 6.6665 6.16669 8.14799 6.16669 9.99984C6.16669 11.8517 7.53924 13.3332 9.25492 13.3332C10.9706 13.3332 12 11.8517 12 11.8517"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const ArrowLeftIcon = ({ width = '2.4rem', height = '2.4rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M11 5L4 12L11 19M4 12H20"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const ArrowRightIcon = ({ width = '2.4rem', height = '2.4rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M3.5 12H20M20 12L13 5M20 12L13 19"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const EllipseIcon = ({ width = '1.2rem', height = '1.2rem', className, fill = 'none' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 12 12"
            fill="none"
        >
            <circle opacity="0.5" cx="6" cy="6" r="6" fill={fill} />
        </svg>
    );
};

export const EllipseSelectedIcon = ({ width = '1.4rem', height = '1.4rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 14 14"
            fill="none"
        >
            <circle cx="7" cy="7" r="5" fill="#DB4444" />
            <circle cx="7" cy="7" r="6" stroke="white" strokeWidth="2" />
        </svg>
    );
};

export const RectangleIcon = ({ width = '2rem', height = '4rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 20 40"
            fill="none"
        >
            <rect width="20" height="40" rx="4" fill="#DB4444" />
        </svg>
    );
};

export const EllipseTimerIcon = ({ width = '0.4rem', height = '0.4rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 4 4"
            fill="none"
        >
            <circle cx="2" cy="2" r="2" fill="#E07575" />
        </svg>
    );
};

export const EllipseProductIcon = ({ width = '3.4rem', height = '3.4rem', className, fill }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 34 34"
            fill="none"
        >
            <circle cx="17" cy="17" r="17" fill={fill} />
        </svg>
    );
};

export const HeartProductIcon = ({ width = '2.4rem', height = '2.4rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path
                d="M8 5C5.7912 5 4 6.73964 4 8.88594C4 10.6185 4.7 14.7305 11.5904 18.8873C11.7138 18.961 11.8555 19 12 19C12.1445 19 12.2862 18.961 12.4096 18.8873C19.3 14.7305 20 10.6185 20 8.88594C20 6.73964 18.2088 5 16 5C13.7912 5 12 7.35511 12 7.35511C12 7.35511 10.2088 5 8 5Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const EyeProductIcon = ({ width = '2.4rem', height = '2.4rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 22 16"
            fill="none"
        >
            <path
                d="M20.257 6.962C20.731 7.582 20.731 8.419 20.257 9.038C18.764 10.987 15.182 15 11 15C6.81801 15 3.23601 10.987 1.74301 9.038C1.51239 8.74113 1.38721 8.37592 1.38721 8C1.38721 7.62408 1.51239 7.25887 1.74301 6.962C3.23601 5.013 6.81801 1 11 1C15.182 1 18.764 5.013 20.257 6.962V6.962Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11 11C12.6569 11 14 9.65685 14 8C14 6.34315 12.6569 5 11 5C9.34315 5 8 6.34315 8 8C8 9.65685 9.34315 11 11 11Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const TrashProductIcon = ({ width = '2.4rem', height = '2.4rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M20 5.57143H5.33333L6.66667 21H17.3333L18.6667 5.57143H4M12 9.42857V17.1429M15.3333 9.42857L14.6667 17.1429M8.66667 9.42857L9.33333 17.1429M9.33333 5.57143L10 3H14L14.6667 5.57143"
                stroke="black"
                strokeWidth="1.56"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const StarFullProductIcon = ({ width = '2rem', height = '2rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 16 15"
            fill="none"
        >
            <path
                d="M14.673 7.17173C15.7437 6.36184 15.1709 4.65517 13.8284 4.65517H11.3992C10.7853 4.65517 10.243 4.25521 10.0617 3.66868L9.33754 1.32637C8.9309 0.0110567 7.0691 0.0110564 6.66246 1.32637L5.93832 3.66868C5.75699 4.25521 5.21469 4.65517 4.60078 4.65517H2.12961C0.791419 4.65517 0.215919 6.35274 1.27822 7.16654L3.39469 8.78792C3.85885 9.1435 4.05314 9.75008 3.88196 10.3092L3.11296 12.8207C2.71416 14.1232 4.22167 15.1704 5.30301 14.342L7.14861 12.9281C7.65097 12.5432 8.34903 12.5432 8.85139 12.9281L10.6807 14.3295C11.7636 15.159 13.2725 14.1079 12.8696 12.8046L12.09 10.2827C11.9159 9.71975 12.113 9.10809 12.5829 8.75263L14.673 7.17173Z"
                fill="#FFAD33"
            />
        </svg>
    );
};

export const StarHalfProductIcon = ({ width = '2rem', height = '2rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 20 20"
            fill="none"
        >
            <path
                d="M9.99981 1.83329C9.7507 1.83145 9.50619 1.90032 9.29466 2.0319C9.08313 2.16348 8.91327 2.35236 8.80481 2.57662L6.95314 6.32995L2.8098 6.93162C2.56336 6.96713 2.33178 7.07094 2.1413 7.23129C1.95081 7.39163 1.80903 7.60212 1.73202 7.83889C1.655 8.07567 1.64582 8.32929 1.70552 8.57101C1.76522 8.81274 1.89141 9.03292 2.0698 9.20662L5.0698 12.1283L4.36147 16.255C4.31934 16.5001 4.34661 16.7521 4.4402 16.9825C4.53379 17.213 4.68997 17.4126 4.89108 17.559C5.0922 17.7053 5.33024 17.7925 5.5783 17.8106C5.82635 17.8287 6.07454 17.7771 6.29481 17.6616L9.99981 15.7133V1.83329Z"
                fill="#FFAD33"
            />
            <path
                opacity="0.25"
                d="M10 1.83595C10.2492 1.83404 10.5001 2.00001 10.5001 2.00001C10.5001 2.00001 11.0866 2.20807 11.1951 2.44195L13.0468 6.35634L17.1902 6.98383C17.4366 7.02086 17.6682 7.12912 17.8587 7.29635C18.0492 7.46358 18.191 7.68309 18.268 7.93003C18.345 8.17697 18.3542 8.44147 18.2945 8.69357C18.2348 8.94567 18.1086 9.1753 17.9302 9.35645L14.9301 12.4035L15.6385 16.7072C15.6806 16.9629 15.6533 17.2257 15.5598 17.466C15.4662 17.7064 15.31 17.9146 15.1089 18.0672C14.9077 18.2198 14.6697 18.3107 14.4216 18.3296C14.1736 18.3486 13.9254 18.2947 13.7051 18.1743L10 16.1423V1.83595Z"
                fill="black"
            />
        </svg>
    );
};

export const StarZeroProductIcon = ({ width = '2rem', height = '2rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 16 15"
            fill="none"
        >
            <path
                opacity="0.25"
                d="M14.673 7.17173C15.7437 6.36184 15.1709 4.65517 13.8284 4.65517H11.3992C10.7853 4.65517 10.243 4.25521 10.0617 3.66868L9.33754 1.32637C8.9309 0.0110567 7.0691 0.0110564 6.66246 1.32637L5.93832 3.66868C5.75699 4.25521 5.21469 4.65517 4.60078 4.65517H2.12961C0.791419 4.65517 0.215919 6.35274 1.27822 7.16654L3.39469 8.78792C3.85885 9.1435 4.05314 9.75008 3.88196 10.3092L3.11296 12.8207C2.71416 14.1232 4.22167 15.1704 5.30301 14.342L7.14861 12.9281C7.65097 12.5432 8.34903 12.5432 8.85139 12.9281L10.6807 14.3295C11.7636 15.159 13.2725 14.1079 12.8696 12.8046L12.09 10.2827C11.9159 9.71975 12.113 9.10809 12.5829 8.75263L14.673 7.17173Z"
                fill="black"
            />
        </svg>
    );
};

export const BrowseCategoryIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
            <g clipPath="url(#clip0_560_868)">
                <path
                    d="M38.9375 6.125H17.0625C15.5523 6.125 14.3281 7.34922 14.3281 8.85938V47.1406C14.3281 48.6508 15.5523 49.875 17.0625 49.875H38.9375C40.4477 49.875 41.6719 48.6508 41.6719 47.1406V8.85938C41.6719 7.34922 40.4477 6.125 38.9375 6.125Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M25.6667 7H31.1354"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M28 44.0052V44.0305"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <line x1="15.1667" y1="39.8334" x2="40.8333" y2="39.8334" stroke="currentColor" strokeWidth="2" />
            </g>
            <defs>
                <clipPath id="clip0_560_868">
                    <rect width="56" height="56" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export const Ellipse20Icon = ({ width = '6.2rem', height = '6.2rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 62 62"
            fill="none"
        >
            <circle cx="31" cy="31" r="31" fill="white" />
        </svg>
    );
};

export const ServiceItemCircleIcon = ({ width = '8.1rem', height = '8rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 81 80"
            fill="none"
        >
            <path
                opacity="0.3"
                d="M80.5 40C80.5 62.0914 62.5914 80 40.5 80C18.4086 80 0.5 62.0914 0.5 40C0.5 17.9086 18.4086 0 40.5 0C62.5914 0 80.5 17.9086 80.5 40ZM11.4071 40C11.4071 56.0675 24.4325 69.0929 40.5 69.0929C56.5675 69.0929 69.5929 56.0675 69.5929 40C69.5929 23.9325 56.5675 10.9071 40.5 10.9071C24.4325 10.9071 11.4071 23.9325 11.4071 40Z"
                fill="#2F2E30"
            />
            <circle cx="40.5" cy="40" r="29" fill="black" />
        </svg>
    );
};

export const ServiceItemDeliveryIcon = ({ width = '4rem', height = '4rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 41 40"
            fill="none"
        >
            <g clipPath="url(#clip0_565_335)">
                <path
                    d="M12.1667 31.6667C14.0076 31.6667 15.5 30.1743 15.5 28.3333C15.5 26.4924 14.0076 25 12.1667 25C10.3257 25 8.83334 26.4924 8.83334 28.3333C8.83334 30.1743 10.3257 31.6667 12.1667 31.6667Z"
                    stroke="#FAFAFA"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M28.8333 31.6667C30.6743 31.6667 32.1667 30.1743 32.1667 28.3333C32.1667 26.4924 30.6743 25 28.8333 25C26.9924 25 25.5 26.4924 25.5 28.3333C25.5 30.1743 26.9924 31.6667 28.8333 31.6667Z"
                    stroke="#FAFAFA"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M8.83331 28.3335H7.49998C6.39541 28.3335 5.49998 27.4381 5.49998 26.3335V21.6668M3.83331 8.3335H20.1666C21.2712 8.3335 22.1666 9.22893 22.1666 10.3335V28.3335M15.5 28.3335H25.5M32.1667 28.3335H33.5C34.6046 28.3335 35.5 27.4381 35.5 26.3335V18.3335M35.5 18.3335H22.1666M35.5 18.3335L31.0826 10.9712C30.7211 10.3688 30.0701 10.0002 29.3676 10.0002H22.1666"
                    stroke="#FAFAFA"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M8.5 28H7.16667C6.0621 28 5.16667 27.1046 5.16667 26V21.3333M3.5 8H19.8333C20.9379 8 21.8333 8.89543 21.8333 10V28M15.5 28H25.1667M32.5 28H33.1667C34.2712 28 35.1667 27.1046 35.1667 26V18M35.1667 18H21.8333M35.1667 18L30.7493 10.6377C30.3878 10.0353 29.7368 9.66667 29.0343 9.66667H21.8333"
                    stroke="#FAFAFA"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M5.5 11.8184H12.1667"
                    stroke="#FAFAFA"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M2.31818 15.4546H8.98484"
                    stroke="#FAFAFA"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M5.5 19.0908H12.1667"
                    stroke="#FAFAFA"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_565_335">
                    <rect width="40" height="40" fill="white" transform="translate(0.5)" />
                </clipPath>
            </defs>
        </svg>
    );
};

export const ServiceItemCustomerIcon = ({ width = '4rem', height = '4rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 40 40"
            fill="none"
        >
            <g clipPath="url(#clip0_565_352)">
                <path
                    d="M13.3334 24.9998C13.3334 23.1589 11.841 21.6665 10 21.6665C8.15907 21.6665 6.66669 23.1589 6.66669 24.9998V28.3332C6.66669 30.1741 8.15907 31.6665 10 31.6665C11.841 31.6665 13.3334 30.1741 13.3334 28.3332V24.9998Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M33.3334 24.9998C33.3334 23.1589 31.841 21.6665 30 21.6665C28.1591 21.6665 26.6667 23.1589 26.6667 24.9998V28.3332C26.6667 30.1741 28.1591 31.6665 30 31.6665C31.841 31.6665 33.3334 30.1741 33.3334 28.3332V24.9998Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M6.66669 24.9998V19.9998C6.66669 16.4636 8.07145 13.0722 10.5719 10.5717C13.0724 8.07126 16.4638 6.6665 20 6.6665C23.5362 6.6665 26.9276 8.07126 29.4281 10.5717C31.9286 13.0722 33.3334 16.4636 33.3334 19.9998V24.9998"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M30 31.6665C30 32.9926 28.9464 34.2644 27.0711 35.202C25.1957 36.1397 22.6522 36.6665 20 36.6665"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_565_352">
                    <rect width="40" height="40" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export const ServiceItemShieldIcon = ({ width = '4rem', height = '4rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 40 40"
            fill="none"
        >
            <path
                d="M8.09906 30.5992L8.09883 30.5991C7.2261 29.9483 6.42549 28.9206 5.8427 27.759C5.25985 26.5973 4.91663 25.3451 4.91663 24.2666V11.8666C4.91663 9.50736 6.67146 6.96177 8.89112 6.13513L8.89208 6.13477L17.2083 3.01826C17.2084 3.01823 17.2085 3.0182 17.2086 3.01817C17.9621 2.73661 18.9615 2.5874 19.9833 2.5874C21.0051 2.5874 22.0045 2.73661 22.758 3.01817C22.7581 3.0182 22.7582 3.01823 22.7582 3.01826L31.0745 6.13477L31.0755 6.13513C33.2951 6.96177 35.05 9.50736 35.05 11.8666V24.2499C35.05 25.3371 34.7066 26.5892 34.124 27.7483C33.5415 28.9073 32.741 29.9313 31.8678 30.5824L31.8675 30.5826L24.7009 35.9326L24.7008 35.9325L24.6946 35.9373C23.4119 36.9264 21.724 37.4332 20 37.4332C18.2773 37.4332 16.5851 36.927 15.2648 35.9486C15.2647 35.9484 15.2645 35.9483 15.2644 35.9482L8.09906 30.5992ZM17.7418 4.43145L17.7412 4.4317L9.4245 7.54837L9.42379 7.54863C8.59621 7.86019 7.85498 8.52248 7.32406 9.29061C6.79297 10.059 6.43329 10.9898 6.43329 11.8832V24.2666C6.43329 25.161 6.74388 26.1892 7.20088 27.101C7.65776 28.0126 8.29325 28.8722 9.00081 29.4005L9.00085 29.4006L16.1672 34.7503C17.2292 35.5445 18.6282 35.9249 20.002 35.9249C21.376 35.9249 22.7782 35.5445 23.8477 34.7516L23.8491 34.7506L31.0157 29.4006L31.0166 29.3999C31.7314 28.8638 32.3668 28.005 32.8222 27.0943C33.2775 26.1837 33.5833 25.16 33.5833 24.2666V11.8666C33.5833 10.9804 33.2229 10.0538 32.6925 9.28645C32.162 8.51889 31.4223 7.85396 30.5976 7.5338L30.5976 7.53376L30.5921 7.5317L22.2754 4.41503L22.2755 4.41495L22.2664 4.41174C21.6282 4.18651 20.8001 4.08314 20.0007 4.08532C19.202 4.0875 18.3751 4.19514 17.7418 4.43145Z"
                fill="#FAFAFA"
                stroke="#FAFAFA"
            />
            <path
                d="M17.4131 21.0536L17.7667 21.4071L18.1202 21.0536L24.4036 14.7703C24.6916 14.4822 25.1751 14.4822 25.4631 14.7703C25.7512 15.0583 25.7512 15.5417 25.4631 15.8298L18.2965 22.9965C18.1452 23.1478 17.9579 23.2167 17.7667 23.2167C17.5755 23.2167 17.3882 23.1478 17.2369 22.9965L14.5536 20.3131C14.2655 20.0251 14.2655 19.5417 14.5536 19.2536C14.8416 18.9655 15.3251 18.9655 15.6131 19.2536L17.4131 21.0536Z"
                fill="#FAFAFA"
                stroke="#FAFAFA"
            />
        </svg>
    );
};

export const GoogleIcon = ({ width = '2.4rem', height = '2.5rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 24 25"
            fill="none"
        >
            <g clipPath="url(#clip0_575_3336)">
                <path
                    d="M23.766 12.7764C23.766 11.9607 23.6999 11.1406 23.5588 10.3381H12.24V14.9591H18.7217C18.4528 16.4494 17.5885 17.7678 16.323 18.6056V21.6039H20.19C22.4608 19.5139 23.766 16.4274 23.766 12.7764Z"
                    fill="#4285F4"
                />
                <path
                    d="M12.2401 24.5008C15.4766 24.5008 18.2059 23.4382 20.1945 21.6039L16.3276 18.6055C15.2517 19.3375 13.8627 19.752 12.2445 19.752C9.11388 19.752 6.45946 17.6399 5.50705 14.8003H1.5166V17.8912C3.55371 21.9434 7.7029 24.5008 12.2401 24.5008Z"
                    fill="#34A853"
                />
                <path
                    d="M5.50253 14.8003C4.99987 13.3099 4.99987 11.6961 5.50253 10.2057V7.11481H1.51649C-0.18551 10.5056 -0.18551 14.5004 1.51649 17.8912L5.50253 14.8003Z"
                    fill="#FBBC04"
                />
                <path
                    d="M12.2401 5.24966C13.9509 5.2232 15.6044 5.86697 16.8434 7.04867L20.2695 3.62262C18.1001 1.5855 15.2208 0.465534 12.2401 0.500809C7.7029 0.500809 3.55371 3.05822 1.5166 7.11481L5.50264 10.2058C6.45064 7.36173 9.10947 5.24966 12.2401 5.24966Z"
                    fill="#EA4335"
                />
            </g>
            <defs>
                <clipPath id="clip0_575_3336">
                    <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
                </clipPath>
            </defs>
        </svg>
    );
};

export const TrendingUpIcon = ({ width = '2.4rem', height = '2.5rem', className, color = '#00B69B' }) => {
    return (
        <svg
            width={width}
            height={height}
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z"
                fill={color}
            />
        </svg>
    );
};
export const TrendingDownIcon = ({ width = '2.4rem', height = '2.5rem', className, color = '#F93C65' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M16 18L18.29 15.71L13.41 10.83L9.41 14.83L2 7.41L3.41 6L9.41 12L13.41 8L19.71 14.29L22 12V18H16Z"
                fill={color}
            />
        </svg>
    );
};

export const UserDashboardIcon = ({ width = '6rem', height = '6rem', className, color = '#8280FF' }) => {
    return (
        <svg
            width={width}
            height={height}
            className={className}
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                opacity="0.21"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 30V37C0 49.7025 10.2975 60 23 60H30H37C49.7025 60 60 49.7025 60 37V30V23C60 10.2975 49.7025 0 37 0H30H23C10.2975 0 0 10.2975 0 23V30Z"
                fill={color}
            />
            <path
                opacity="0.587821"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.6667 23.3333C20.6667 26.2789 23.0545 28.6667 26 28.6667C28.9455 28.6667 31.3333 26.2789 31.3333 23.3333C31.3333 20.3878 28.9455 18 26 18C23.0545 18 20.6667 20.3878 20.6667 23.3333ZM34 28.6667C34 30.8758 35.7909 32.6667 38 32.6667C40.2091 32.6667 42 30.8758 42 28.6667C42 26.4575 40.2091 24.6667 38 24.6667C35.7909 24.6667 34 26.4575 34 28.6667Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.9778 31.3333C19.6826 31.3333 14.5177 34.5687 14.0009 40.9323C13.9727 41.2789 14.6356 42 14.97 42H36.9956C37.9972 42 38.0128 41.194 37.9972 40.9333C37.6065 34.3909 32.3616 31.3333 25.9778 31.3333ZM45.2746 42L40.1333 42C40.1333 38.9988 39.1417 36.2291 37.4683 34.0008C42.0103 34.0505 45.7189 36.3469 45.998 41.2C46.0092 41.3955 45.998 42 45.2746 42Z"
                fill={color}
            />
        </svg>
    );
};
export const TotalOrderIcon = ({ width = '6rem', height = '6rem', className, color = '#FEC53D' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 60 60"
            fill="none"
        >
            <path
                opacity="0.21"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 30V37C0 49.7025 10.2975 60 23 60H30H37C49.7025 60 60 49.7025 60 37V30V23C60 10.2975 49.7025 0 37 0H30H23C10.2975 0 0 10.2975 0 23V30Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15 24.3165L27.9005 31.7646C28.0394 31.8448 28.1851 31.9027 28.3333 31.9395V46.3847L15.9201 39.0385C15.3498 38.701 15 38.0876 15 37.4249V24.3165ZM45 24.1185V37.4249C45 38.0876 44.6502 38.701 44.0799 39.0385L31.6667 46.3847V31.8129C31.6969 31.7978 31.7269 31.7817 31.7566 31.7646L45 24.1185Z"
                fill={color}
            />
            <path
                opacity="0.499209"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.4052 20.7014C15.5628 20.5024 15.7617 20.3343 15.9936 20.2108L29.1186 13.2201C29.6695 12.9266 30.3304 12.9266 30.8814 13.2201L44.0064 20.2108C44.1852 20.306 44.3443 20.4277 44.48 20.5697L30.0899 28.8778C29.9953 28.9325 29.908 28.995 29.8285 29.064C29.749 28.995 29.6618 28.9325 29.5671 28.8778L15.4052 20.7014Z"
                fill={color}
            />
        </svg>
    );
};

export const TotalSalesIcon = ({ width = '6rem', height = '6rem', className, color = '#4AD991' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 60 60"
            fill="none"
        >
            <path
                opacity="0.21"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 30V37C0 49.7025 10.2975 60 23 60H30H37C49.7025 60 60 49.7025 60 37V30V23C60 10.2975 49.7025 0 37 0H30H23C10.2975 0 0 10.2975 0 23V30Z"
                fill={color}
            />
            <path
                d="M19.1111 40.8889H42.4444C43.3036 40.8889 44 41.5853 44 42.4444C44 43.3036 43.3036 44 42.4444 44H17.5556C16.6964 44 16 43.3036 16 42.4444V17.5556C16 16.6964 16.6964 16 17.5556 16C18.4147 16 19.1111 16.6964 19.1111 17.5556V40.8889Z"
                fill={color}
            />
            <path
                opacity="0.5"
                d="M24.9126 34.175C24.325 34.8018 23.3406 34.8335 22.7139 34.2459C22.0871 33.6584 22.0554 32.674 22.643 32.0472L28.4763 25.825C29.0445 25.2188 29.9888 25.1663 30.6209 25.7056L35.2249 29.6344L41.2235 22.0361C41.7559 21.3618 42.734 21.2467 43.4083 21.7791C44.0826 22.3114 44.1977 23.2896 43.6654 23.9639L36.6654 32.8306C36.1186 33.5231 35.1059 33.6227 34.4347 33.05L29.7306 29.0358L24.9126 34.175Z"
                fill={color}
            />
        </svg>
    );
};

export const TotalPendingIcon = ({ width = '6rem', height = '6rem', className, color = '#FF9066' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 60 60"
            fill="none"
        >
            <path
                opacity="0.3"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 30V37C0 49.7025 10.2975 60 23 60H30H37C49.7025 60 60 49.7025 60 37V30V23C60 10.2975 49.7025 0 37 0H30H23C10.2975 0 0 10.2975 0 23V30Z"
                fill={color}
            />
            <path
                opacity="0.78"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M28.6312 23.8088C28.6512 23.5483 28.8684 23.3472 29.1297 23.3472H29.5475C29.8044 23.3472 30.0195 23.5418 30.045 23.7974L30.6667 30.0139L35.0814 32.5366C35.2372 32.6256 35.3333 32.7913 35.3333 32.9707V33.3592C35.3333 33.6889 35.0199 33.9284 34.7018 33.8416L28.3987 32.1226C28.1673 32.0595 28.0133 31.841 28.0317 31.6019L28.6312 23.8088Z"
                fill={color}
            />
            <path
                opacity="0.901274"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.7218 14.9844C22.4577 14.6696 21.9477 14.7901 21.8524 15.1898L20.2189 22.0379C20.1412 22.3636 20.3993 22.6721 20.7336 22.6531L27.7783 22.2539C28.1892 22.2306 28.3976 21.7486 28.133 21.4333L26.3316 19.2865C27.4965 18.8884 28.7317 18.6805 30 18.6805C36.2592 18.6805 41.3333 23.7546 41.3333 30.0139C41.3333 36.2731 36.2592 41.3472 30 41.3472C23.7408 41.3472 18.6667 36.2731 18.6667 30.0139C18.6667 28.9631 18.809 27.9339 19.0864 26.9448L16.5188 26.2246C16.1808 27.4298 16 28.7007 16 30.0139C16 37.7458 22.268 44.0139 30 44.0139C37.732 44.0139 44 37.7458 44 30.0139C44 22.2819 37.732 16.0139 30 16.0139C28.0551 16.0139 26.2029 16.4104 24.5197 17.1271L22.7218 14.9844Z"
                fill={color}
            />
        </svg>
    );
};

export const DecreaseIcon = ({ width = '1.6rem', height = '1.6rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 16 16"
            fill="none"
        >
            <path
                d="M8.24268 8.63334L11.5427 5.33334L12.4854 6.27601L8.24268 10.5187L4.00002 6.27601L4.94268 5.33334L8.24268 8.63334Z"
                fill="black"
            />
        </svg>
    );
};

export const IncreaseIcon = ({ width = '1.6rem', height = '1.6rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 16 16"
            fill="none"
        >
            <path
                d="M7.75732 7.36666L4.45732 10.6667L3.51465 9.72399L7.75732 5.48132L12 9.72399L11.0573 10.6667L7.75732 7.36666Z"
                fill="black"
            />
        </svg>
    );
};

export const MinusIcon = ({ width = '2.4rem', height = '2.4rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 24 24"
            fill="none"
        >
            <path d="M20 12H4" stroke="black" stroke-width="1.5" stroke-linecap="round" />
        </svg>
    );
};

export const PlusIcon = ({ width = '2.4rem', height = '2.4rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 24 24"
            fill="none"
        >
            <path d="M12 20V12M12 12V4M12 12H20M12 12H4" stroke="white" stroke-width="1.5" stroke-linecap="round" />
        </svg>
    );
};

export const DeliveryIcon = ({ width = '4rem', height = '4rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 40 40"
            fill="none"
        >
            <g clip-path="url(#clip0_261_4843)">
                <path
                    d="M11.6673 31.6667C13.5083 31.6667 15.0007 30.1743 15.0007 28.3333C15.0007 26.4924 13.5083 25 11.6673 25C9.82637 25 8.33398 26.4924 8.33398 28.3333C8.33398 30.1743 9.82637 31.6667 11.6673 31.6667Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M28.3333 31.6667C30.1743 31.6667 31.6667 30.1743 31.6667 28.3333C31.6667 26.4924 30.1743 25 28.3333 25C26.4924 25 25 26.4924 25 28.3333C25 30.1743 26.4924 31.6667 28.3333 31.6667Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M8.33398 28.3335H7.00065C5.89608 28.3335 5.00065 27.4381 5.00065 26.3335V21.6668M3.33398 8.3335H19.6673C20.7719 8.3335 21.6673 9.22893 21.6673 10.3335V28.3335M15.0007 28.3335H25.0007M31.6673 28.3335H33.0007C34.1052 28.3335 35.0007 27.4381 35.0007 26.3335V18.3335M35.0007 18.3335H21.6673M35.0007 18.3335L30.5833 10.9712C30.2218 10.3688 29.5708 10.0002 28.8683 10.0002H21.6673"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M8 28H6.66667C5.5621 28 4.66667 27.1046 4.66667 26V21.3333M3 8H19.3333C20.4379 8 21.3333 8.89543 21.3333 10V28M15 28H24.6667M32 28H32.6667C33.7712 28 34.6667 27.1046 34.6667 26V18M34.6667 18H21.3333M34.6667 18L30.2493 10.6377C29.8878 10.0353 29.2368 9.66667 28.5343 9.66667H21.3333"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M5 11.8182H11.6667"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M1.81836 15.4545H8.48503"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M5 19.0909H11.6667"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_261_4843">
                    <rect width="40" height="40" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export const ReturnIcon = ({ width = '4rem', height = '4rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 40 40"
            fill="none"
        >
            <g clip-path="url(#clip0_261_4865)">
                <path
                    d="M33.3327 18.3334C32.9251 15.4004 31.5645 12.6828 29.4604 10.5992C27.3564 8.51557 24.6256 7.18155 21.6888 6.80261C18.752 6.42366 15.7721 7.02082 13.208 8.5021C10.644 9.98337 8.6381 12.2666 7.49935 15M6.66602 8.33335V15H13.3327"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M6.66602 21.6667C7.07361 24.5997 8.43423 27.3173 10.5383 29.4009C12.6423 31.4845 15.3731 32.8185 18.3099 33.1974C21.2467 33.5764 24.2266 32.9792 26.7907 31.4979C29.3547 30.0167 31.3606 27.7335 32.4994 25M33.3327 31.6667V25H26.666"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_261_4865">
                    <rect width="40" height="40" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export const ApplicationErrorIcon = ({ width = '3.6rem', height = '3.6rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 36 36"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 27.9411 8.05887 36 18 36Z"
                fill="url(#paint0_linear_0_21058)"
            />
            <defs>
                <linearGradient id="paint0_linear_0_21058" x1="0" y1="0" x2="0" y2="36" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF8F8F" />
                    <stop offset="1" stopColor="#FFC1C1" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export const CallContactIcon = ({ width = '4rem', height = '4rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 40 40"
            fill="none"
        >
            <rect width="40" height="40" rx="20" fill="#DB4444" />
            <path
                d="M18.5542 14.24L15.1712 10.335C14.7812 9.885 14.0662 9.887 13.6132 10.341L10.8312 13.128C10.0032 13.957 9.76623 15.188 10.2452 16.175C13.1069 22.1 17.8853 26.8851 23.8062 29.755C24.7922 30.234 26.0222 29.997 26.8502 29.168L29.6582 26.355C30.1132 25.9 30.1142 25.181 29.6602 24.791L25.7402 21.426C25.3302 21.074 24.6932 21.12 24.2822 21.532L22.9182 22.898C22.8484 22.9712 22.7565 23.0194 22.6566 23.0353C22.5567 23.0512 22.4543 23.0339 22.3652 22.986C20.1357 21.7021 18.2862 19.8502 17.0052 17.619C16.9573 17.5298 16.9399 17.4272 16.9558 17.3272C16.9717 17.2271 17.02 17.135 17.0932 17.065L18.4532 15.704C18.8652 15.29 18.9102 14.65 18.5542 14.239V14.24Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};

export const MailContactIcon = ({ width = '4rem', height = '4rem', className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            viewBox="0 0 40 40"
            fill="none"
        >
            <rect width="40" height="40" rx="20" fill="#DB4444" />
            <path
                d="M10 13L20 20L30 13M10 27H30V13H10V27Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};
