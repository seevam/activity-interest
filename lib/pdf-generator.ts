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
  let yPos = 20;

  // Page 1: Cover Page
  doc.setFillColor(0, 107, 255); // Blue primary
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Logo/Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('Ascend Now', pageWidth / 2, 40, { align: 'center' });

  doc.setFontSize(18);
  doc.setFont('helvetica', 'normal');
  doc.text('Career Exploration Platform', pageWidth / 2, 50, { align: 'center' });

  // Main title
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  doc.text('YOUR INTEREST', pageWidth / 2, 100, { align: 'center' });
  doc.text('DISCOVERY REPORT', pageWidth / 2, 115, { align: 'center' });

  // Student name
  doc.setFontSize(24);
  doc.text(studentName || 'Student', pageWidth / 2, 140, { align: 'center' });

  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text('Session 1 Complete', pageWidth / 2, 155, { align: 'center' });
  doc.text(new Date().toLocaleDateString(), pageWidth / 2, 165, { align: 'center' });

  // Quote
  doc.setFontSize(12);
  doc.setFont('helvetica', 'italic');
  const quote = '"Every expert was once a beginner who refused to give up."';
  doc.text(quote, pageWidth / 2, 220, { align: 'center', maxWidth: 160 });

  // Page 2: Interest Distribution
  doc.addPage();
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  doc.setTextColor(0, 107, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  yPos = 20;
  doc.text('YOUR INTEREST CONSTELLATION', pageWidth / 2, yPos, { align: 'center' });

  yPos += 15;
  doc.setTextColor(51, 51, 51);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');

  // Energizes section
  yPos += 10;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 75, 75);
  doc.text('🔥 ENERGIZES ME', 20, yPos);

  yPos += 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 51, 51);
  const energizesLabels = phase1Data.energizesMe
    .map((id) => interestCards.find((c) => c.id === id)?.label)
    .filter(Boolean);

  energizesLabels.forEach((label) => {
    yPos += 6;
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.text(`• ${label}`, 25, yPos);
  });

  // Curious About section
  yPos += 15;
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 165, 0);
  doc.text('🤔 CURIOUS ABOUT', 20, yPos);

  yPos += 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 51, 51);
  const curiousLabels = phase1Data.curiousAbout
    .map((id) => interestCards.find((c) => c.id === id)?.label)
    .filter(Boolean);

  curiousLabels.forEach((label) => {
    yPos += 6;
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.text(`• ${label}`, 25, yPos);
  });

  // Not For Me section
  yPos += 15;
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(156, 163, 175);
  doc.text('😐 NOT FOR ME', 20, yPos);

  yPos += 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 51, 51);
  const notForMeLabels = phase1Data.notForMe
    .map((id) => interestCards.find((c) => c.id === id)?.label)
    .filter(Boolean);

  notForMeLabels.forEach((label) => {
    yPos += 6;
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.text(`• ${label}`, 25, yPos);
  });

  // Page 3: AI Profile
  doc.addPage();
  yPos = 20;
  doc.setTextColor(0, 107, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('YOUR INTEREST PROFILE', pageWidth / 2, yPos, { align: 'center' });

  yPos += 15;
  doc.setTextColor(51, 51, 51);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  const narrativeLines = doc.splitTextToSize(profile.narrative, pageWidth - 40);
  narrativeLines.forEach((line: string) => {
    yPos += 6;
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.text(line, 20, yPos);
  });

  // Top Themes
  yPos += 15;
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 107, 255);
  doc.text('TOP 3 INTEREST THEMES', pageWidth / 2, yPos, { align: 'center' });

  yPos += 10;
  profile.topThemes.forEach((theme) => {
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 107, 255);
    doc.text(`${theme.emoji} ${theme.title}`, 20, yPos);

    yPos += 7;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 51, 51);
    const descLines = doc.splitTextToSize(theme.description, pageWidth - 40);
    descLines.forEach((line: string) => {
      yPos += 5;
      doc.text(line, 20, yPos);
    });

    yPos += 10;
  });

  // Page 4: Career Clusters
  doc.addPage();
  yPos = 20;
  doc.setTextColor(0, 107, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('RECOMMENDED CAREER CLUSTERS', pageWidth / 2, yPos, { align: 'center' });

  yPos += 15;
  profile.recommendedClusters.forEach((cluster) => {
    if (yPos > 230) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 107, 255);
    doc.text(cluster.name, 20, yPos);

    yPos += 7;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 51, 51);
    const reasonLines = doc.splitTextToSize(cluster.reason, pageWidth - 40);
    reasonLines.forEach((line: string) => {
      yPos += 5;
      doc.text(line, 20, yPos);
    });

    yPos += 7;
    doc.setFont('helvetica', 'bold');
    doc.text('Sample Careers:', 20, yPos);
    yPos += 5;
    doc.setFont('helvetica', 'normal');
    cluster.sampleCareers.forEach((career) => {
      yPos += 5;
      doc.text(`• ${career}`, 25, yPos);
    });

    yPos += 12;
  });

  // Next Steps
  yPos += 10;
  if (yPos > 240) {
    doc.addPage();
    yPos = 20;
  }
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 107, 255);
  doc.text('NEXT STEPS', 20, yPos);

  yPos += 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 51, 51);
  const nextSteps = [
    '□ Discuss results with mentor',
    '□ Research one career cluster',
    '□ Start Session 2 when ready',
    '□ Keep exploring what excites you!',
  ];

  nextSteps.forEach((step) => {
    yPos += 7;
    doc.text(step, 20, yPos);
  });

  // Save the PDF
  const fileName = `${studentName.replace(/\s+/g, '_') || 'Student'}_Interest_Profile.pdf`;
  doc.save(fileName);
}
