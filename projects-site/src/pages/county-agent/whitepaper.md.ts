import type { APIRoute } from 'astro';
import { whitepaper } from '../../lib/county-whitepaper';
export const GET: APIRoute = () => new Response(whitepaper, { headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'Content-Disposition': 'attachment; filename="county-agent-whitepaper.md"' } });
