#!/usr/bin/env python3
"""
PowerPoint Presentation Generator for Cursor AI Lectures
Generates PPTX files from markdown lecture content using template.pptx
"""

import os
import re
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
import markdown
from bs4 import BeautifulSoup

def parse_markdown_content(filepath):
    """Parse markdown file and extract structured content"""
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Extract title and metadata
    title_match = re.search(r'^# (.+)', content, re.MULTILINE)
    title = title_match.group(1) if title_match else "Untitled Lecture"
    
    # Extract duration, audience, etc.
    duration_match = re.search(r'\*\*Duration:\*\* (.+)', content)
    audience_match = re.search(r'\*\*Target Audience:\*\* (.+)', content)
    
    duration = duration_match.group(1) if duration_match else "30 minutes"
    audience = audience_match.group(1) if audience_match else "Developers"
    
    # Extract learning objectives
    objectives_match = re.search(r'## Learning Objectives\n\n(.+?)\n\n##', content, re.DOTALL)
    objectives = []
    if objectives_match:
        obj_content = objectives_match.group(1)
        objectives = [line.strip('- ').strip() for line in obj_content.split('\n') if line.strip().startswith('-')]
    
    # Extract main sections
    sections = []
    section_pattern = r'### (\d+\.\s+.+?) \((\d+) minutes?\)\n\n(.*?)(?=\n### |\n## |$)'
    section_matches = re.finditer(section_pattern, content, re.DOTALL)
    
    for match in section_matches:
        section_title = match.group(1)
        section_time = match.group(2)
        section_content = match.group(3)
        
        # Extract subsections
        subsection_pattern = r'#### (.+?)\n\n(.*?)(?=\n#### |\n### |\n## |$)'
        subsections = []
        for submatch in re.finditer(subsection_pattern, section_content, re.DOTALL):
            subsections.append({
                'title': submatch.group(1),
                'content': submatch.group(2).strip()
            })
        
        sections.append({
            'title': section_title,
            'time': section_time,
            'subsections': subsections
        })
    
    # Extract examples
    examples = []
    example_pattern = r'### (Example \d+.+?)\n\n(.*?)(?=\n### |$)'
    example_matches = re.finditer(example_pattern, content, re.DOTALL)
    
    for match in example_matches:
        examples.append({
            'title': match.group(1),
            'content': match.group(2).strip()
        })
    
    # Extract speaker notes
    speaker_notes_match = re.search(r'## Speaker Notes\n\n(.*?)(?=\n## |$)', content, re.DOTALL)
    speaker_notes = speaker_notes_match.group(1) if speaker_notes_match else ""
    
    return {
        'title': title,
        'duration': duration,
        'audience': audience,
        'objectives': objectives,
        'sections': sections,
        'examples': examples,
        'speaker_notes': speaker_notes
    }

def clean_text(text):
    """Clean text content by removing markdown formatting"""
    # Remove markdown formatting
    text = re.sub(r'\*\*(.+?)\*\*', r'\1', text)  # Bold
    text = re.sub(r'\*(.+?)\*', r'\1', text)      # Italic
    text = re.sub(r'`(.+?)`', r'\1', text)        # Code
    text = re.sub(r'^\-\s+', '• ', text, flags=re.MULTILINE)  # Bullet points
    text = re.sub(r'^\s*\d+\.\s+', '• ', text, flags=re.MULTILINE)  # Numbered lists
    return text.strip()

def add_text_to_placeholder(placeholder, text, font_size=18):
    """Add text to a placeholder with proper formatting"""
    if not text:
        return
    
    text_frame = placeholder.text_frame
    text_frame.clear()
    text_frame.word_wrap = True
    
    # Split text into paragraphs
    paragraphs = text.split('\n\n')
    
    for i, para_text in enumerate(paragraphs):
        if not para_text.strip():
            continue
            
        if i > 0:
            p = text_frame.add_paragraph()
        else:
            p = text_frame.paragraphs[0]
        
        p.text = clean_text(para_text)
        p.font.size = Pt(font_size)
        
        # Format bullet points
        if para_text.strip().startswith('•') or para_text.strip().startswith('-'):
            p.level = 0

def create_title_slide(prs, lecture_data):
    """Create title slide"""
    # Use title slide layout (index 0)
    slide_layout = prs.slide_layouts[0]
    slide = prs.slides.add_slide(slide_layout)
    
    # Set title
    if slide.shapes.title:
        slide.shapes.title.text = lecture_data['title']
    
    # Set subtitle with duration and audience info
    subtitle_text = f"Duration: {lecture_data['duration']}\nTarget Audience: {lecture_data['audience']}"
    
    # Find subtitle placeholder
    for shape in slide.placeholders:
        if shape.placeholder_format.idx == 1:  # Subtitle placeholder
            add_text_to_placeholder(shape, subtitle_text, 16)
            break
    
    # Add speaker notes
    notes_slide = slide.notes_slide
    text_frame = notes_slide.notes_text_frame
    text_frame.text = "Welcome to the Cursor AI Development Course. This lecture will introduce you to the fundamentals of AI-assisted development."
    
    return slide

def create_objectives_slide(prs, lecture_data):
    """Create learning objectives slide"""
    slide_layout = prs.slide_layouts[1]  # Title and Content layout
    slide = prs.slides.add_slide(slide_layout)
    
    # Set title
    slide.shapes.title.text = "Learning Objectives"
    
    # Add objectives to content placeholder
    objectives_text = "By the end of this lecture, you will be able to:\n\n"
    objectives_text += "\n\n".join([f"• {obj}" for obj in lecture_data['objectives']])
    
    # Find content placeholder
    for shape in slide.placeholders:
        if shape.placeholder_format.idx == 1:  # Content placeholder
            add_text_to_placeholder(shape, objectives_text)
            break
    
    # Add speaker notes
    notes_slide = slide.notes_slide
    text_frame = notes_slide.notes_text_frame
    text_frame.text = "Take a moment to review these learning objectives with the audience. These are the key skills they'll gain from this session."
    
    return slide

def create_section_slide(prs, section_data):
    """Create a slide for a main section"""
    slide_layout = prs.slide_layouts[1]  # Title and Content layout
    slide = prs.slides.add_slide(slide_layout)
    
    # Set title
    slide.shapes.title.text = section_data['title']
    
    # Prepare content from subsections
    content_text = ""
    for subsection in section_data['subsections'][:3]:  # Limit to first 3 subsections per slide
        content_text += f"• {subsection['title']}\n"
        # Add key points from content
        lines = subsection['content'].split('\n')
        key_points = [line for line in lines if line.strip().startswith('-') or line.strip().startswith('•')][:3]
        for point in key_points:
            clean_point = clean_text(point).replace('•', '').replace('-', '').strip()
            if clean_point:
                content_text += f"  - {clean_point}\n"
        content_text += "\n"
    
    # Find content placeholder
    for shape in slide.placeholders:
        if shape.placeholder_format.idx == 1:  # Content placeholder
            add_text_to_placeholder(shape, content_text.strip())
            break
    
    # Add speaker notes
    notes_slide = slide.notes_slide
    text_frame = notes_slide.notes_text_frame
    speaker_note = f"This section covers {section_data['title']} and should take approximately {section_data['time']} minutes. "
    speaker_note += "Focus on the key concepts and provide practical examples for each point."
    text_frame.text = speaker_note
    
    return slide

def create_example_slide(prs, example_data):
    """Create a slide for code examples"""
    slide_layout = prs.slide_layouts[1]  # Title and Content layout
    slide = prs.slides.add_slide(slide_layout)
    
    # Set title
    slide.shapes.title.text = example_data['title']
    
    # Clean and format example content
    content = clean_text(example_data['content'])
    
    # Find content placeholder
    for shape in slide.placeholders:
        if shape.placeholder_format.idx == 1:  # Content placeholder
            add_text_to_placeholder(shape, content, 14)  # Smaller font for code
            break
    
    # Add speaker notes
    notes_slide = slide.notes_slide
    text_frame = notes_slide.notes_text_frame
    text_frame.text = "Walk through this example step by step. Consider doing a live demonstration if possible."
    
    return slide

def create_summary_slide(prs, lecture_data):
    """Create summary slide"""
    slide_layout = prs.slide_layouts[1]  # Title and Content layout
    slide = prs.slides.add_slide(slide_layout)
    
    # Set title
    slide.shapes.title.text = "Summary & Next Steps"
    
    # Create summary content
    summary_text = "Key Takeaways:\n\n"
    summary_text += "\n".join([f"• {obj}" for obj in lecture_data['objectives'][:4]])  # Limit to 4 key points
    summary_text += "\n\nNext Steps:\n• Practice with the examples provided\n• Apply these concepts to your current projects\n• Prepare for the next lecture"
    
    # Find content placeholder
    for shape in slide.placeholders:
        if shape.placeholder_format.idx == 1:  # Content placeholder
            add_text_to_placeholder(shape, summary_text)
            break
    
    # Add speaker notes
    notes_slide = slide.notes_slide
    text_frame = notes_slide.notes_text_frame
    text_frame.text = "Summarize the key points covered and encourage questions. Provide information about the next lecture and any homework or practice exercises."
    
    return slide

def generate_presentation(markdown_file, template_file, output_file):
    """Generate a complete PowerPoint presentation from markdown content"""
    print(f"Processing {markdown_file}...")
    
    # Parse markdown content
    lecture_data = parse_markdown_content(markdown_file)
    
    # Load template
    if os.path.exists(template_file):
        prs = Presentation(template_file)
        # Remove existing slides to start fresh
        while len(prs.slides) > 0:
            rId = prs.slides._sldIdLst[0].rId
            prs.part.drop_rel(rId)
            del prs.slides._sldIdLst[0]
    else:
        print(f"Template file {template_file} not found. Creating new presentation.")
        prs = Presentation()
    
    # Create slides
    create_title_slide(prs, lecture_data)
    create_objectives_slide(prs, lecture_data)
    
    # Create section slides
    for section in lecture_data['sections']:
        create_section_slide(prs, section)
    
    # Create example slides
    for example in lecture_data['examples'][:3]:  # Limit to first 3 examples
        create_example_slide(prs, example)
    
    # Create summary slide
    create_summary_slide(prs, lecture_data)
    
    # Save presentation
    prs.save(output_file)
    print(f"Created {output_file} with {len(prs.slides)} slides")

def main():
    """Main function to generate all presentations"""
    template_file = "template.pptx"
    
    # List of lecture files
    lecture_files = [
        "lecture-1-cursor-overview-basics.md",
        "lecture-2-advanced-chat-inline-editing.md", 
        "lecture-3-codebase-understanding-context.md",
        "lecture-4-cursor-rules-configuration.md",
        "lecture-5-mcp-servers-enterprise-integration.md"
    ]
    
    # Generate presentations
    for lecture_file in lecture_files:
        if os.path.exists(lecture_file):
            # Create output filename
            base_name = lecture_file.replace('.md', '')
            output_file = f"{base_name}.pptx"
            
            try:
                generate_presentation(lecture_file, template_file, output_file)
            except Exception as e:
                print(f"Error processing {lecture_file}: {str(e)}")
        else:
            print(f"File {lecture_file} not found")
    
    print("All presentations generated successfully!")

if __name__ == "__main__":
    main() 