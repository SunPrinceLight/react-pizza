import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton:React.FC<{ key:number }> = (props) => (
    <ContentLoader
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="121" y="412" rx="30" ry="30" width="154" height="47" />
        <rect x="2" y="419" rx="10" ry="10" width="95" height="30" />
        <rect x="0" y="280" rx="10" ry="10" width="280" height="20" />
        <circle cx="125" cy="144" r="125" />
        <rect x="0" y="312" rx="10" ry="10" width="280" height="88" />
    </ContentLoader>
)

export default Skeleton;

