import fs from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { profile } from '@/data/profile';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const geistSansDir = path.join(process.cwd(), 'node_modules', 'geist', 'dist', 'fonts', 'geist-sans');
const geistRegular = fs.readFileSync(path.join(geistSansDir, 'Geist-Regular.ttf'));
const geistBold = fs.readFileSync(path.join(geistSansDir, 'Geist-Bold.ttf'));

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0B1211',
          color: '#F3F6F5',
          fontFamily: 'Geist',
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700 }}>{profile.name}</div>
        <div style={{ marginTop: 20, fontSize: 32, color: '#5EEAD4' }}>{profile.role}</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Geist', data: geistRegular, style: 'normal', weight: 400 },
        { name: 'Geist', data: geistBold, style: 'normal', weight: 700 },
      ],
    },
  );
}
