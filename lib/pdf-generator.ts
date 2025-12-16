import jsPDF from 'jspdf';
import { AIProfile, Phase1Data } from './types';
import { interestCards } from './data';

export async function generatePDF(
  studentName: string,
  phase1Data: Phase1Data,
  profile: AIProfile
): Promise<void> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let yPos = 20;

  // Helper function to add a colored box
  const addColorBox = (x: number, y: number, width: number, height: number, color: [number, number, number]) => {
    doc.setFillColor(color[0], color[1], color[2]);
    doc.roundedRect(x, y, width, height, 3, 3, 'F');
  };

  // Helper function to add a section header with background
  const addSectionHeader = (text: string, y: number, color: [number, number, number]) => {
    addColorBox(margin, y - 5, contentWidth, 12, color);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(text, pageWidth / 2, y + 3, { align: 'center' });
    return y + 15;
  };

  // Page 1: Modern Cover Page
  // Gradient-like effect with multiple rectangles
  const blueShades = [
    [0, 107, 255],
    [8, 117, 255],
    [16, 127, 255],
    [24, 137, 255],
    [32, 147, 255],
  ];

  blueShades.forEach((shade, index) => {
    doc.setFillColor(shade[0], shade[1], shade[2]);
    doc.rect(0, index * (pageHeight / 5), pageWidth, pageHeight / 5, 'F');
  });

  // White accent box
  addColorBox(margin, 60, contentWidth, 100, [255, 255, 255]);

  // Logo/Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  doc.text('ASCEND NOW', pageWidth / 2, 35, { align: 'center' });

  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Career Exploration Platform', pageWidth / 2, 45, { align: 'center' });

  // Main title in white box
  doc.setTextColor(0, 107, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('INTEREST DISCOVERY', pageWidth / 2, 85, { align: 'center' });
  doc.text('REPORT', pageWidth / 2, 100, { align: 'center' });

  doc.setFontSize(20);
  doc.setTextColor(51, 51, 51);
  doc.text(studentName || 'Student', pageWidth / 2, 125, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Session 1 Complete', pageWidth / 2, 145, { align: 'center' });

  // Add accent line
  doc.setDrawColor(0, 107, 255);
  doc.setLineWidth(2);
  doc.line(pageWidth / 2 - 30, 150, pageWidth / 2 + 30, 150);

  // Date in colored box at bottom
  addColorBox(margin, 190, contentWidth, 20, [8, 194, 255]);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.text(new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }), pageWidth / 2, 200, { align: 'center' });

  // Modern quote at bottom
  doc.setFontSize(11);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(255, 255, 255);
  const quote = '"Every expert was once a beginner who refused to give up."';
  doc.text(quote, pageWidth / 2, 230, { align: 'center', maxWidth: 160 });

  // Page 2: Interest Distribution with Modern Layout
  doc.addPage();
  doc.setFillColor(250, 250, 250);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  yPos = 25;
  yPos = addSectionHeader('YOUR INTEREST CONSTELLATION', yPos, [0, 107, 255]);

  doc.setTextColor(51, 51, 51);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Here\'s how you sorted your interests across three categories:', margin, yPos);

  yPos += 12;

  // Energizes section with modern card
  const energizesLabels = phase1Data.energizesMe
    .map((id) => interestCards.find((c) => c.id === id)?.label)
    .filter(Boolean);

  if (energizesLabels.length > 0) {
    // Card background
    addColorBox(margin, yPos, contentWidth, 8 + (energizesLabels.length * 6), [255, 240, 240]);

    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(220, 38, 38);
    doc.text('ENERGIZES ME', margin + 5, yPos + 6);
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(9);
    doc.text(`(${energizesLabels.length} items)`, margin + 45, yPos + 6);

    yPos += 12;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 51, 51);

    energizesLabels.forEach((label, idx) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      const bullet = String.fromCharCode(9679); // Bullet point
      doc.text(`${bullet} ${label}`, margin + 10, yPos);
      yPos += 6;
    });

    yPos += 8;
  }

  // Curious About section
  const curiousLabels = phase1Data.curiousAbout
    .map((id) => interestCards.find((c) => c.id === id)?.label)
    .filter(Boolean);

  if (curiousLabels.length > 0) {
    if (yPos > 250) {
      doc.addPage();
      doc.setFillColor(250, 250, 250);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      yPos = 20;
    }

    addColorBox(margin, yPos, contentWidth, 8 + (curiousLabels.length * 6), [255, 247, 237]);

    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(245, 158, 11);
    doc.text('CURIOUS ABOUT', margin + 5, yPos + 6);
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(9);
    doc.text(`(${curiousLabels.length} items)`, margin + 48, yPos + 6);

    yPos += 12;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 51, 51);

    curiousLabels.forEach((label) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      const bullet = String.fromCharCode(9679);
      doc.text(`${bullet} ${label}`, margin + 10, yPos);
      yPos += 6;
    });

    yPos += 8;
  }

  // Not For Me section
  const notForMeLabels = phase1Data.notForMe
    .map((id) => interestCards.find((c) => c.id === id)?.label)
    .filter(Boolean);

  if (notForMeLabels.length > 0) {
    if (yPos > 250) {
      doc.addPage();
      doc.setFillColor(250, 250, 250);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      yPos = 20;
    }

    addColorBox(margin, yPos, contentWidth, 8 + (notForMeLabels.length * 6), [245, 245, 245]);

    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(107, 114, 128);
    doc.text('NOT FOR ME', margin + 5, yPos + 6);
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(9);
    doc.text(`(${notForMeLabels.length} items)`, margin + 38, yPos + 6);

    yPos += 12;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 51, 51);

    notForMeLabels.forEach((label) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      const bullet = String.fromCharCode(9679);
      doc.text(`${bullet} ${label}`, margin + 10, yPos);
      yPos += 6;
    });
  }

  // Page 3: AI Profile with Modern Design
  doc.addPage();
  doc.setFillColor(250, 250, 250);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  yPos = 25;
  yPos = addSectionHeader('YOUR PERSONALIZED PROFILE', yPos, [0, 107, 255]);

  // Narrative in a styled box
  addColorBox(margin, yPos, contentWidth, 60, [255, 255, 255]);
  doc.setDrawColor(8, 194, 255);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, yPos, contentWidth, 60, 3, 3, 'S');

  yPos += 6;
  doc.setTextColor(51, 51, 51);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const narrativeLines = doc.splitTextToSize(profile.narrative, contentWidth - 10);
  narrativeLines.forEach((line: string) => {
    yPos += 5;
    doc.text(line, margin + 5, yPos);
  });

  yPos += 15;

  // Top Themes with modern cards
  yPos = addSectionHeader('YOUR TOP 3 INTEREST THEMES', yPos, [8, 194, 255]);

  const themeColors: [number, number, number][] = [
    [219, 234, 254], // Light blue
    [254, 240, 138], // Light yellow
    [220, 252, 231], // Light green
  ];

  profile.topThemes.forEach((theme, index) => {
    if (yPos > 230) {
      doc.addPage();
      doc.setFillColor(250, 250, 250);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      yPos = 20;
    }

    // Theme card with color
    const cardHeight = 35;
    addColorBox(margin, yPos, contentWidth, cardHeight, themeColors[index % 3]);

    // Add colored left border
    const borderColors: [number, number, number][] = [
      [59, 130, 246],  // Blue
      [234, 179, 8],   // Yellow
      [34, 197, 94],   // Green
    ];
    doc.setFillColor(...borderColors[index % 3]);
    doc.roundedRect(margin, yPos, 3, cardHeight, 1.5, 1.5, 'F');

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(31, 41, 55);
    // Remove emoji from title, just use text
    doc.text(theme.title.toUpperCase(), margin + 8, yPos + 8);

    yPos += 14;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 85, 99);
    const descLines = doc.splitTextToSize(theme.description, contentWidth - 16);
    descLines.forEach((line: string) => {
      yPos += 4.5;
      doc.text(line, margin + 8, yPos);
    });

    yPos += 10;
  });

  // Page 4: Career Clusters with Modern Layout
  doc.addPage();
  doc.setFillColor(250, 250, 250);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  yPos = 25;
  yPos = addSectionHeader('RECOMMENDED CAREER CLUSTERS', yPos, [0, 107, 255]);

  doc.setTextColor(51, 51, 51);
  doc.setFontSize(10);
  doc.text('Based on your interests, explore these career pathways:', margin, yPos);
  yPos += 12;

  profile.recommendedClusters.forEach((cluster, index) => {
    if (yPos > 220) {
      doc.addPage();
      doc.setFillColor(250, 250, 250);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      yPos = 20;
    }

    // Cluster card
    addColorBox(margin, yPos, contentWidth, 50, [255, 255, 255]);
    doc.setDrawColor(0, 107, 255);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, yPos, contentWidth, 50, 3, 3, 'S');

    // Cluster number badge
    addColorBox(margin + 5, yPos + 5, 8, 8, [0, 107, 255]);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text((index + 1).toString(), margin + 9, yPos + 10, { align: 'center' });

    // Cluster name
    doc.setFontSize(12);
    doc.setTextColor(0, 107, 255);
    doc.text(cluster.name.toUpperCase(), margin + 18, yPos + 10);

    // Reason
    yPos += 16;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 51, 51);
    const reasonLines = doc.splitTextToSize(cluster.reason, contentWidth - 16);
    reasonLines.forEach((line: string) => {
      yPos += 4;
      doc.text(line, margin + 8, yPos);
    });

    // Sample careers with tags
    yPos += 8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('SAMPLE CAREERS:', margin + 8, yPos);

    yPos += 5;
    let xOffset = margin + 8;
    cluster.sampleCareers.forEach((career, idx) => {
      const careerWidth = doc.getTextWidth(career) + 6;

      if (xOffset + careerWidth > pageWidth - margin) {
        xOffset = margin + 8;
        yPos += 7;
      }

      // Career tag
      addColorBox(xOffset, yPos - 4, careerWidth, 6, [219, 234, 254]);
      doc.setTextColor(30, 64, 175);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.text(career, xOffset + 3, yPos);

      xOffset += careerWidth + 3;
    });

    yPos += 12;
  });

  // Next Steps Section with Modern Design
  yPos += 5;
  if (yPos > 230) {
    doc.addPage();
    doc.setFillColor(250, 250, 250);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    yPos = 25;
  }

  yPos = addSectionHeader('YOUR NEXT STEPS', yPos, [16, 185, 129]);

  const nextSteps = [
    'Share and discuss these results with your mentor or teacher',
    'Research one career cluster that interests you most',
    'Start Session 2 to explore careers in depth when ready',
    'Keep exploring activities and subjects that excite you!',
  ];

  nextSteps.forEach((step, index) => {
    if (yPos > 265) {
      doc.addPage();
      doc.setFillColor(250, 250, 250);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      yPos = 20;
    }

    // Checkbox
    doc.setDrawColor(16, 185, 129);
    doc.setLineWidth(0.5);
    doc.rect(margin + 2, yPos - 3, 5, 5);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 51, 51);
    const stepLines = doc.splitTextToSize(step, contentWidth - 15);
    stepLines.forEach((line: string) => {
      doc.text(line, margin + 10, yPos);
      yPos += 5;
    });
    yPos += 3;
  });

  // Footer with branding
  yPos = pageHeight - 20;
  doc.setDrawColor(0, 107, 255);
  doc.setLineWidth(1);
  doc.line(margin, yPos, pageWidth - margin, yPos);

  yPos += 6;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 107, 255);
  doc.text('ASCEND NOW', pageWidth / 2, yPos, { align: 'center' });

  yPos += 5;
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Empowering Students to Discover Their Future', pageWidth / 2, yPos, { align: 'center' });

  // Save the PDF
  const fileName = `${studentName.replace(/\s+/g, '_') || 'Student'}_Interest_Profile.pdf`;
  doc.save(fileName);
}
