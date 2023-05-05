import useTranslation from 'next-translate/useTranslation';

import DeleteReadingGoalModal from '../ReadingGoal/DeleteReadingGoalModal';
import UpdateReadingGoalModal from '../ReadingGoal/UpdateReadingGoalModal';

import ProgressPageGoalWidget from './ProgressPageGoalWidget';
import ProgressPageStreakWidget from './ProgressPageStreakWidget';
import ReadingHistory from './ReadingHistory';
import styles from './ReadingProgressPage.module.scss';

import NextSeoWrapper from '@/components/NextSeoWrapper';
import PageContainer from '@/components/PageContainer';
import useGetStreakWithMetadata from '@/hooks/auth/useGetStreakWithMetadata';
import { getLanguageAlternates } from '@/utils/locale';
import { getCanonicalUrl, getReadingGoalProgressNavigationUrl } from '@/utils/navigation';

const ReadingProgressPage = () => {
  const { t, lang } = useTranslation('reading-progress');
  const { error, readingGoal, weekData, streak, currentReadingDay, isLoading } =
    useGetStreakWithMetadata({
      showDayName: true,
    });

  if (error) return null;

  return (
    <>
      <NextSeoWrapper
        title={t('reading-progress-header')}
        url={getCanonicalUrl(lang, getReadingGoalProgressNavigationUrl())}
        languageAlternates={getLanguageAlternates(getReadingGoalProgressNavigationUrl())}
        nofollow
        noindex
      />

      <PageContainer>
        <div className={styles.contentContainer}>
          <h1>{t('reading-progress-header')}</h1>

          <div className={styles.widgetsContainer}>
            <ProgressPageStreakWidget
              weekData={weekData}
              readingGoal={readingGoal}
              streak={streak}
              isLoading={isLoading}
            />

            <ProgressPageGoalWidget
              currentReadingDay={currentReadingDay}
              readingGoal={readingGoal}
              isLoading={isLoading}
            />
          </div>

          <ReadingHistory />

          {readingGoal && (
            <div className={styles.manageGoalSection}>
              <h1>{t('manage-goal')}</h1>

              <div className={styles.manageGoalContainer}>
                <DeleteReadingGoalModal />
                <UpdateReadingGoalModal readingGoal={readingGoal} />
              </div>
            </div>
          )}
        </div>
      </PageContainer>
    </>
  );
};

export default ReadingProgressPage;
