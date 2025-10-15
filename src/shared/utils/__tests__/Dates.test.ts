import Dates from "../Dates";

describe("Dates utility", () => {
  const testDate = new Date("2025-10-15T09:05:00"); // 15th Oct 2025, 09:05

  describe("formatDate", () => {
    it("should format date in 'DD MMM YYYY' French by default", () => {
      expect(Dates.formatDate(testDate)).toBe("15 Oct 2025");
    });

    it("should format date in 'DD/MM/YYYY'", () => {
      expect(Dates.formatDate(testDate, "DD/MM/YYYY")).toBe("15/10/2025");
    });

    it("should format date in English", () => {
      expect(Dates.formatDate(testDate, "DD MMM YYYY", "en")).toBe(
        "15 Oct 2025"
      );
    });

    it("should throw for invalid date", () => {
      expect(() => Dates.formatDate(undefined)).toThrow("Invalid date");
      expect(() => Dates.formatDate("invalid-date")).toThrow("Invalid date");
    });
  });

  describe("formatTime", () => {
    it("should format hours and minutes correctly", () => {
      expect(Dates.formatTime(testDate)).toBe("09:05");
    });
  });

  describe("formatDateTime", () => {
    it("should combine date and time", () => {
      expect(Dates.formatDateTime(testDate)).toBe("15 Oct 2025 09:05");
      expect(Dates.formatDateTime(testDate, "DD/MM/YYYY")).toBe(
        "15/10/2025 09:05"
      );
    });
  });

  describe("formatDay", () => {
    it("should return correct day name in French", () => {
      expect(Dates.formatDay(3)).toBe("mer."); // Wednesday
    });

    it("should return correct day name in English", () => {
      expect(Dates.formatDay(3, "en")).toBe("wed");
    });

    it("should throw if day is out of range", () => {
      expect(() => Dates.formatDay(0)).toThrow();
      expect(() => Dates.formatDay(8)).toThrow();
    });
  });

  describe("formatMonth", () => {
    it("should return correct month in French", () => {
      expect(Dates.formatMonth(9)).toBe("Oct");
    });

    it("should return correct month in English", () => {
      expect(Dates.formatMonth(9, "en")).toBe("Oct");
    });

    it("should throw if month is out of range", () => {
      expect(() => Dates.formatMonth(-1)).toThrow();
      expect(() => Dates.formatMonth(12)).toThrow();
    });
  });

  describe("formatMonthYear", () => {
    it("should return month and year in French", () => {
      expect(Dates.formatMonthYear(testDate)).toBe("Oct 2025");
    });

    it("should return month and year in English", () => {
      expect(Dates.formatMonthYear(testDate, "en")).toBe("Oct 2025");
    });
  });
});
