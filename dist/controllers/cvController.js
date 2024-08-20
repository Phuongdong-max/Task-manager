"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCv = exports.getCv = exports.uploadCv = void 0;
const personal_1 = __importDefault(require("../models/personal"));
const experience_1 = __importDefault(require("../models/experience"));
const education_1 = __importDefault(require("../models/education"));
const language_1 = __importDefault(require("../models/language"));
const skill_1 = __importDefault(require("../models/skill"));
const certification_1 = __importDefault(require("../models/certification"));
const uploadCv = async (req, res) => {
    try {
        const { userId, fullName, position, dob: dayOfBirth, gender, country, email, phone, workExperiences, educations, skills: skillName, languages: languageName, certifications: certificationName, } = req.body;
        const image = req.file?.buffer;
        const parsedWorkExperiences = JSON.parse(workExperiences);
        const parsedEducations = JSON.parse(educations);
        await personal_1.default.create({
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
            await experience_1.default.create({
                userId,
                position: experience.position,
                companyName: experience.companyName,
                startDate: experience.startDate,
                endDate: experience.endDate,
                description: experience.description,
            });
        }
        for (const education of parsedEducations) {
            await education_1.default.create({
                userId,
                school: education.school,
                fieldOfStudy: education.fieldOfStudy,
                endDate: education.endDate,
            });
        }
        await language_1.default.create({
            userId,
            languageName,
        });
        await skill_1.default.create({
            userId,
            skillName,
        });
        await certification_1.default.create({
            userId,
            certificationName,
        });
        res.status(201).json("Successful to upload CV");
    }
    catch (error) {
        console.error("Error uploading CV:", error);
        res.status(500).json({ error: "Failed to upload CV" });
    }
};
exports.uploadCv = uploadCv;
const getCv = async (req, res) => {
    try {
        const { userId } = req.body;
        const personalinfo = await personal_1.default.findOne({ where: { userId } });
        const experience = await experience_1.default.findOne({ where: { userId } });
        const education = await education_1.default.findOne({ where: { userId } });
        const language = await language_1.default.findOne({ where: { userId } });
        const skill = await skill_1.default.findOne({ where: { userId } });
        const certification = await certification_1.default.findOne({ where: { userId } });
        const cvData = {
            personalinfo,
            experience,
            education,
            language,
            skill,
            certification,
        };
        res.status(200).json(cvData);
    }
    catch (error) {
        console.error("Error fetching CV:", error);
        res.status(500).json({ error: "Failed to fetch CV" });
    }
};
exports.getCv = getCv;
const updateCv = async (req, res) => {
    try {
        const { userId, fullName, position, dob: dayOfBirth, gender, country, email, phone, workExperiences, educations, skills: skillName, languages: languageName, certifications: certificationName, } = req.body;
        const image = req.file?.buffer;
        const parsedWorkExperiences = JSON.parse(workExperiences);
        const parsedEducations = JSON.parse(educations);
        const existingPersonalInfo = await personal_1.default.findOne({
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
            await experience_1.default.destroy({ where: { userId } });
            await education_1.default.destroy({ where: { userId } });
            await language_1.default.destroy({ where: { userId } });
            await skill_1.default.destroy({ where: { userId } });
            await certification_1.default.destroy({ where: { userId } });
        }
        else {
            await personal_1.default.create({
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
            await experience_1.default.create({
                userId,
                position: experience.position,
                companyName: experience.companyName,
                startDate: experience.startDate,
                endDate: experience.endDate,
                description: experience.description,
            });
        }
        for (const education of parsedEducations) {
            await education_1.default.create({
                userId,
                school: education.school,
                fieldOfStudy: education.fieldOfStudy,
                endDate: education.endDate,
            });
        }
        await language_1.default.create({
            userId,
            languageName,
        });
        await skill_1.default.create({
            userId,
            skillName,
        });
        await certification_1.default.create({
            userId,
            certificationName,
        });
        res.status(201).json("CV updated successfully");
    }
    catch (error) {
        console.error("Error updating CV:", error);
        res.status(500).json({ error: "Failed to update CV" });
    }
};
exports.updateCv = updateCv;
