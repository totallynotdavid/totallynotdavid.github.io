import H1 from '@/components/ui/H1.astro';
import H2 from '@/components/ui/H2.astro';
import HrDots from '@/components/ui/HrDots.astro';
import Link from '@/components/ui/Link.astro';

export const mdxComponents = {
  a: Link,
  h1: H1,
  h2: H2,
  hr: HrDots,
};

export default mdxComponents;
