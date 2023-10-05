/* eslint-disable no-unused-vars */
import uuid from "uuid";

const encryptPassword = (password) => {
  let newPassword = password; // add encryption algorithm here
  return newPassword;
};

class User {
  constructor({ email, firstName, lastName, password, companyName }) {
    this.id = uuid.v4();
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.isVerified = false;
    this.companyName = companyName;
    this.createdAt = Date.now();
    this.deletedAt = null;
  }

  getUserWithoutPassword() {
    const { password, ...otherKeys } = this;
    return otherKeys;
  }

  verifyEmail() {
    this.isVerified = true;
    return this.getUserWithoutPassword();
  }

  getUserInfo() {
    return this.getUserWithoutPassword();
  }

  resetPassword(newPassword) {
    this.newPassword = encryptPassword(newPassword);
    return this.getUserWithoutPassword();
  }

  verifyPassword(password) {
    let matches = false; // function to match encrypted password
    return matches;
  }
}

class Document {
  constructor({
    Creator,
    pages,
    signatureBoxes,
    published = false,
    expiryHours = 1,
    remind = "15 minutes",
  }) {
    if (!(Creator instanceof User)) {
      throw new Error("Creator must be an instance of the User class.");
    }
    if (!Array.isArray(pages)) {
      throw new Error("Pages must be an array");
    }
    if (!Array.isArray(signatureBoxes)) {
      throw new Error("signatureBoxes must be an array");
    }
    this.id = uuid.v4();
    this.createdAt = Date.now();
    this.deletedAt = null;
    this.createdBy = Creator;
    this.pages = pages;
    this.isPublished = published;
    this.expiryHours = expiryHours;
    this.remind = remind;
  }

  publishDocument() {
    this.isPublished = true;
  }

  updateDocument({ pages }) {
    if (this.isPublished) {
      throw new Error(
        "A Published Document may not be edited. Please add a new Document"
      );
    }
    if (!Array.isArray(pages)) {
      throw new Error("Pages must be an array");
    }
    this.pages = pages;
  }

  deleteDocument() {
    if (this.isPublished) {
      throw new Error("A Published Document may not be deleted.");
    }

    this.deletedAt = Date.now();
  }
}

class SignatureBox {
  constructor({ top, bottom, left, right, pageNumber }, Document) {
    this.id = uuid.v4();
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
    this.pageNumber = pageNumber;
    this.document = Document;
    this.createdAt = Date.now();
    this.deletedAt = null;
  }
}

class SignatureInvitation {
  constructor({ DocToSign, Signee }) {
    if (!(DocToSign instanceof Document)) {
      throw new Error("Document must be an instance of the Document class.");
    }
    if (!(Signee instanceof User)) {
      throw new Error("Signee must be an instance of the User class.");
    }
    this.id = uuid.v4();
    this.createdAt = Date.now();
    this.deletedAt = null;
    this.documentToSign = DocToSign;
    this.signee = Signee;
    this.status = "pending";
  }

  sign(arrOfSignatureBoxes) {
    this.status = "accepted";
    // this.documentToSign.signatureBoxes
    arrOfSignatureBoxes.forEach((eachSignBox) => {});
  }

  reject() {
    this.status = "rejected";
  }
}

class SignBoxSelection {
  constructor({ Box, SignatureInvitation, signatureCanvas }) {
    this.box = Box;
    this.signatureInvitation = SignatureInvitation;
    this.id = uuid.v4();
    this.createdAt = Date.now();
    this.deletedAt = null;
    this.sign = signatureCanvas;
  }
}
