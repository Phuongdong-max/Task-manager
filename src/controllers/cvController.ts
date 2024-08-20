import { Request, Response } from "express";
import {
  PersonalInfo,
  WorkExperience,
  Education,
  Language,
  Skill,
  Certification,
} from "../models";

export const uploadCv = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      fullName,
      position,
      dob: dayOfBirth,
      gender,
      country,
      email,
      phone,
      workExperiences,
      educations,
      skills: skillName,
      languages: languageName,
      certifications: certificationName,
    } = req.body;

    const image = req.file?.buffer;
    const parsedWorkExperiences = JSON.parse(workExperiences);
    const parsedEducations = JSON.parse(educations);

    await PersonalInfo.create({
      userId,
      fullName,
      position,
      dayOfBirth,
      gender,
      country,
      phone,
      email,
      image,
    });

    for (const experience of parsedWorkExperiences) {
      await WorkExperience.create({
        userId,
        position: experience.position,
        companyName: experience.companyName,
        startDate: experience.startDate,
        endDate: experience.endDate,
        description: experience.description,
      });
    }

    for (const education of parsedEducations) {
      await Education.create({
        userId,
        school: education.school,
        fieldOfStudy: education.fieldOfStudy,
        endDate: education.endDate,
      });
    }

    await Language.create({
      userId,
      languageName,
    });

    await Skill.create({
      userId,
      skillName,
    });

    await Certification.create({
      userId,
      certificationName,
    });

    res.status(201).json("Successful to upload CV");
  } catch (error) {
    console.error("Error uploading CV:", error);
    res.status(500).json({ error: "Failed to upload CV" });
  }
};

export const getCv = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const personalinfo = await PersonalInfo.findOne({ where: { userId } });
    const experience = await WorkExperience.findAll({ where: { userId } });
    const education = await Education.findAll({ where: { userId } });
    const language = await Language.findOne({ where: { userId } });
    const skill = await Skill.findOne({ where: { userId } });
    const certification = await Certification.findOne({ where: { userId } });

    const cvData = {
      personalinfo,
      experience,
      education,
      language,
      skill,
      certification,
    };
    res.status(200).json(cvData);
  } catch (error) {
    console.error("Error fetching CV:", error);
    res.status(500).json({ error: "Failed to fetch CV" });
  }
};

export const updateCv = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      fullName,
      position,
      dob: dayOfBirth,
      gender,
      country,
      email,
      phone,
      workExperiences,
      educations,
      skills: skillName,
      languages: languageName,
      certifications: certificationName,
    } = req.body;

    const image = req.file?.buffer;
    const parsedWorkExperiences = JSON.parse(workExperiences);
    const parsedEducations = JSON.parse(educations);

    const existingPersonalInfo = await PersonalInfo.findOne({
      where: { userId },
    });

    if (existingPersonalInfo) {
      await existingPersonalInfo.update({
        fullName,
        position,
        dayOfBirth,
        gender,
        country,
        phone,
        email,
        image,
      });

      await WorkExperience.destroy({ where: { userId } });
      await Education.destroy({ where: { userId } });
      await Language.destroy({ where: { userId } });
      await Skill.destroy({ where: { userId } });
      await Certification.destroy({ where: { userId } });
    } else {
      await PersonalInfo.create({
        userId,
        fullName,
        position,
        dayOfBirth,
        gender,
        country,
        phone,
        email,
        image,
      });
    }

    for (const experience of parsedWorkExperiences) {
      await WorkExperience.create({
        userId,
        position: experience.position,
        companyName: experience.companyName,
        startDate: experience.startDate,
        endDate: experience.endDate,
        description: experience.description,
      });
    }

    for (const education of parsedEducations) {
      await Education.create({
        userId,
        school: education.school,
        fieldOfStudy: education.fieldOfStudy,
        endDate: education.endDate,
      });
    }

    await Language.create({
      userId,
      languageName,
    });

    await Skill.create({
      userId,
      skillName,
    });

    await Certification.create({
      userId,
      certificationName,
    });

    res.status(201).json("CV updated successfully");
  } catch (error) {
    console.error("Error updating CV:", error);
    res.status(500).json({ error: "Failed to update CV" });
  }
};
