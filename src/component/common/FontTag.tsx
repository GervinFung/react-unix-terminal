import React from 'react';

const Font = ({
    fontFamily,
}: Readonly<{
    fontFamily: string;
}>) => (
    <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
        />
        <link
            href={`https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${Array.from(
                { length: 9 },
                (_, i) => (i + 1) * 100,
            ).join(';')}&display=swap`}
            rel="stylesheet"
        />
    </>
);

export default Font;
