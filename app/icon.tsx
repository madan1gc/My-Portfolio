import fs from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

const geistBold = fs.readFileSync(
  path.join(process.cwd(), 'node_modules', 'geist', 'dist', 'fonts', 'geist-sans', 'Geist-Bold.ttf'),
);

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #6366F1, #A855F7)',
          color: '#F5F5F7',
          fontSize: 18,
          fontWeight: 700,
          fontFamily: 'Geist',
        }}
      >
        MG
      </div>
    ),
    { ...size, fonts: [{ name: 'Geist', data: geistBold, style: 'normal', weight: 700 }] },
  );
}
